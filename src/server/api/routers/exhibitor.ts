import { set, z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";
import { getLocale } from "@/locales";
import { TRPCError } from "@trpc/server";
import { FoodPreferencesValue, Prisma } from "@prisma/client";
import sendEmail from "@/utils/send-email";
import { randomUUID } from "crypto";
import { error, time } from "console";
import { get } from "http";

const foodPreferencesType = z.enum(["Representative", "Banquet"]);
const foodPreferencesValue = z.enum([
  "Meat",
  "Vegan",
  "LactoseFree",
  "GlutenFree",
  "AlcoholFree",
]);

export const exhibitorRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        companyName: z.string().trim(),
        organizationNumber: z.string().trim(),
        email: z.string().email().trim(),
        contactPerson: z.string().trim(),
        phoneNumber: z.string().trim(),
        locale: z.enum(["en", "sv"]),
      })
    )
    .mutation(
      async ({
        input: {
          companyName,
          organizationNumber,
          email,
          contactPerson,
          phoneNumber,
          locale,
        },
        ctx,
      }) => {
        const t = getLocale(locale);
        const v = validateOrganizationNumber(organizationNumber);
        if ("error" in v) {
          throw new TRPCError({
            message: "Invalid organization number",
            code: "BAD_REQUEST",
          });
        } else {
          organizationNumber = v.value;
        }

        await ctx.prisma.exhibitorInterestRegistration.create({
          data: {
            name: companyName,
            organizationNumber,
            contactPerson,
            phoneNumber,
            email,
          },
        });

        try {
          sendEmail(
            email,
            t.email.subject,
            t.email.body(
              companyName,
              organizationNumber,
              email,
              contactPerson,
              phoneNumber
            ),
            "sales@ddagen.se"
          );
        } catch (e) {
          return { ok: false, error: "send-email" as const };
        }
        return { ok: true };
      }
    ),
  // Gets the next allowed foreign organizationNumber
  getNextForeignOrg: publicProcedure.query(async ({ ctx }) => {
    // Read all organizationNumbers
    const exhibitor = await ctx.prisma.exhibitorInterestRegistration.findMany({
      select: { organizationNumber: true },
    });
    /*const exhibitor = [{organizationNumber: "1234567897"}, {organizationNumber: "0000000019"}];*/
    // Get all current foreign organizationNumbers, sort in descending order
    const allForeign9 = exhibitor
      .filter(s => s.organizationNumber[0] == '0')
      .map(s => parseInt(s.organizationNumber.slice(0,9)))
      .sort((a,b) => b - a);
    // Get the first 9 digits of the highest foreign organizationNumber, add 1
    const nextForeignDigits = allForeign9.length ?
      (allForeign9[0]+1).toString() :
      "000000001";
    const nextForeign9 = String(nextForeignDigits).padStart(9, '0');
    // Get the sum of the next foreign organizationNumber (Luhn-algorithm)
    const nextForeign9Sum = nextForeign9
      .split("")
      .map(x=>parseInt(x))
      .map((x, i) => (i % 2 > 0 ? x : x * 2 >= 10 ? (x * 2) % 10 + 1 : x * 2))
      .reduce((a, b) => a + b, 0) % 10;
    // Create a correct organizationNumber
    const nextForeignNum = nextForeign9 + ((10 - nextForeign9Sum) % 10).toString();
    const nextForeign = String(nextForeignNum).padStart(10, '0');
    return {
      organizationNumber: nextForeign,
    };
  }),
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: {
        id: true,
        name: true,
        organizationNumber: true,
        invoiceEmail: true,
        description: true,
        industry: true,
      },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        invoiceEmail: z.string().email().trim(),
        description: z.string().trim(),
        industry: z.string().trim(),
        extraChairs: z.number(),
        extraTables: z.number(),
        extraDrinkCoupons: z.number(),
        extraRepresentativeSpots: z.number(),
        extraMealCoupons: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.exhibitorId },
        data: {
          invoiceEmail: input.invoiceEmail,
          description: input.description,
          industry: input.industry,
          extraChairs: input.extraChairs,
          extraTables: input.extraTables,
          extraDrinkCoupons: input.extraDrinkCoupons,
          extraRepresentativeSpots: input.extraRepresentativeSpots,
          extraMealCoupons: input.extraMealCoupons,
        },
      });
    }),
  getPackage: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: {
        packageTier: true,
        customTables: true,
        customChairs: true,
        customDrinkCoupons: true,
        customRepresentativeSpots: true,
        customBanquetTicketsWanted: true,
        studentMeetings: true, 
        extraMealCoupons: true, // Måste kanske lägga till customMealCoupons i db, känns inte nödvändigt just nu
      },
    });
  }),
  getExtras: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: {
        extraTables: true,
        extraChairs: true,
        extraDrinkCoupons: true,
        extraRepresentativeSpots: true,
        totalBanquetTicketsWanted: true,
        extraMealCoupons: true,
        alcFreeDrinkCoupons: true,
        lastChanged: true,
      },
    });
  }),
  setExtras: protectedProcedure
    .input(
      z.object({
        extraChairs: z.number(),
        extraTables: z.number(),
        extraDrinkCoupons: z.number(),
        extraRepresentativeSpots: z.number(),
        totalBanquetTicketsWanted: z.number(),
        extraMealCoupons: z.number(),
        alcFreeDrinkCoupons: z.number(),
        lastChanged: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.exhibitorId },
        data: {
          extraChairs: input.extraChairs,
          extraTables: input.extraTables,
          extraDrinkCoupons: input.extraDrinkCoupons,
          extraRepresentativeSpots: input.extraRepresentativeSpots,
          totalBanquetTicketsWanted: input.totalBanquetTicketsWanted,
          extraMealCoupons: input.extraMealCoupons,
          alcFreeDrinkCoupons: input.alcFreeDrinkCoupons,
          lastChanged: z.date().parse(input.lastChanged),
        },
      });
    }),
    setSpecialOrders: publicProcedure
    .input(
      z.object({
        exhibitorId: z.string(),
        studentMeetings: z.number(),
        socialMediaPost: z.number(),
        panelDiscussion: z.number(),
        goodieBagLogo: z.number(),
      })
    )
    .mutation(async ({ ctx, input}) => {
      await ctx.prisma.exhibitor.update({
        where: { id: input.exhibitorId },
        data: {
          studentMeetings: input.studentMeetings,
          socialMediaPost: input.socialMediaPost,
          panelDiscussion: input.panelDiscussion,
          goodiebagLogo:   input.goodieBagLogo,
        },
      });
    }),
    setCompanyHost: publicProcedure
    .input(
      z.object({
        exhibitorId: z.string(),
        companyHostName: z.string(),
        companyHostNumber: z.string(),
        companyHostEmail: z.string(),
      })
    )
    .mutation(async ({ ctx, input}) => {
      await ctx.prisma.exhibitor.update({
        where: { id: input.exhibitorId },
        data: {
          companyHostName: input.companyHostName,
          companyHostNumber: input.companyHostNumber,
          companyHostEmail: input.companyHostEmail,
        },
      });
    }),
  getName: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: { name: true },
    });
  }),
  setName: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.exhibitorId },
        data: { name: input },
      });
    }),
  getOrganizationNumber: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: { organizationNumber: true },
    });
  }),
  getInvoiceEmail: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: { invoiceEmail: true },
    });
  }),
  setInvoiceEmail: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.exhibitorId },
        data: { invoiceEmail: input },
      });
    }),
  getBillingMethod: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: { billingMethod: true },
    });
  }),
  setBillingMethod: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.exhibitorId },
        data: { billingMethod: input },
      });
    }),
  getPhysicalAddress: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: { companyAddress: true },
    });
  }),
  getCompanyHostName: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findFirstOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: { companyHostName: true},
    });
  }),
  getCompanyHostEmail: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findFirstOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: { companyHostEmail: true},
    });
  }),
  getCompanyHostNumber: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findFirstOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: { companyHostNumber: true},
    });
  }),
  setPhysicalAddress: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.exhibitorId },
        data: { companyAddress: input },
      });
    }),
  getDescription: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: { description: true },
    });
  }),
  setDescription: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.exhibitorId },
        data: { description: input },
      });
    }),
    getAllowMarketing: protectedProcedure.query(async ({ ctx }) => {
      return await ctx.prisma.exhibitor.findUniqueOrThrow({
        where: { id: ctx.session.exhibitorId },
        select: { allowMarketing: true },
      });
    }),
    setAllowMarketing: protectedProcedure
      .input(z.boolean())
      .mutation(async ({ ctx, input }) => {
        await ctx.prisma.exhibitor.update({
          where: { id: ctx.session.exhibitorId },
          data: { allowMarketing: input },
        });
      }),
    getIndustry: protectedProcedure.query(async ({ ctx }) => {
      return await ctx.prisma.exhibitor.findUniqueOrThrow({
        where: { id: ctx.session.exhibitorId },
        select: { industry: true },
      });
    }),
    setIndustry: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.exhibitorId },
        data: { industry: input },
      });
    }),
  getLogo: protectedProcedure.query(async ({ ctx }) => {
    const exhibitor = await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.exhibitorId },
      select: { logoWhite: true, logoColor: true },
    });
    return {
      white: exhibitor.logoWhite?.toString("base64"),
      color: exhibitor.logoColor?.toString("base64"),
    };
  }),
  setLogo: protectedProcedure
    .input(
      z.object({
        b64data: z.string(),
        kind: z.enum(["white", "color"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const logo = Buffer.from(input.b64data, "base64");
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.exhibitorId },
        data:
          input.kind === "white" ? { logoWhite: logo } : { logoColor: logo },
      });
    }),
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      where: { exhibitorId: ctx.session.exhibitorId },
    });
  }),
  setUsers: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().trim(),
        email: z.string().email().trim(),
        phone: z.string().trim(),
        role: z.string().trim(),
        locale: z.enum(["en", "sv"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = getLocale(input.locale);
      try {
        if (input.id) {
          await ctx.prisma.user.updateMany({
            where: { id: input.id, exhibitorId: ctx.session.exhibitorId },
            data: {
              name: input.name,
              email: input.email,
              phone: input.phone,
              role: input.role,
            },
          });
          return { ok: true, update: true, id: undefined };
        } else {
          const id = randomUUID();
          await ctx.prisma.user.create({
            data: {
              id: id,
              exhibitorId: ctx.session.exhibitorId,
              name: input.name,
              email: input.email,
              phone: input.phone,
              role: input.role,
            },
          });
          return { ok: true, update: false, id: id };
        }
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          return {
            ok: false,
            error:
              t.exhibitorSettings.table.row1.section3.alerts
                .errorDuplicateEmail,
          };
        }
        return {
          ok: false,
          error: t.error.unknown,
        };
      }
    }),
  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        locale: z.enum(["en", "sv"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = getLocale(input.locale);
      try {
        if (ctx.session.userId && ctx.session.userId === input.id) {
          return {
            ok: false,
            error:
              t.exhibitorSettings.table.row1.section3.alerts.errorDeleteSelf,
          };
        }
        await ctx.prisma.user.delete({
          where: { id: input.id },
        });
        return { ok: true };
      } catch (e) {
        return {
          ok: false,
          error: t.error.unknown,
        };
      }
    }),
  getPreferenceCount: protectedProcedure.query(async ({ ctx }) => {
    const counts: [{ banqcount: bigint; reprcount: bigint }] = await ctx.prisma
      .$queryRaw`
      SELECT
        sum(case when type = 'Banquet' then 1 else 0 end) AS BanqCount,
        sum(case when type = 'Representative' then 1 else 0 end) AS ReprCount
      FROM food_specifications
      WHERE "exhibitorId" = ${ctx.session.exhibitorId}
    `;

    return {
      banqcount: Number(counts[0].banqcount),
      reprcount: Number(counts[0].reprcount),
    };
  }),
  getFoodPreferences: protectedProcedure
    .input(foodPreferencesType)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.foodPreferences.findMany({
        where: {
          exhibitorId: ctx.session.exhibitorId,
          type: input,
        },
      });
    }),
  setFoodPreferences: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().trim(),
        value: z.array(foodPreferencesValue),
        comment: z.string().trim(),
        type: foodPreferencesType,
        locale: z.enum(["en", "sv"]),
        allowPreferenceChange: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = getLocale(input.locale);
      if (input.allowPreferenceChange) {
        try {
          if (input.id) {
            await ctx.prisma.foodPreferences.updateMany({
              where: {
                id: input.id,
                exhibitorId: ctx.session.exhibitorId,
                type: input.type,
              },
              data: {
                name: input.name,
                value: input.value as Prisma.Enumerable<FoodPreferencesValue>,
                comment: input.comment,
              },
            });
            return { ok: true, update: true, id: undefined };
          } else {
            const id = randomUUID();
            await ctx.prisma.foodPreferences.create({
              data: {
                id: id,
                exhibitorId: ctx.session.exhibitorId,
                name: input.name,
                value: (input.value as Prisma.Enumerable<FoodPreferencesValue>),
                comment: input.comment,
                type: input.type,
              },
            });
            return { ok: true, update: false, id: id };
          }
        } catch (e) {
          console.log(e);
          return {
            ok: false,
            error: t.error.unknown,
          };
        }
      } else {
        return {
          ok: false,
          error: t.error.changePreferencesAfterDeadline,
        };
      }
    }),
  deleteFoodPreferences: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        locale: z.enum(["en", "sv"]),
        allowPreferenceChange: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = getLocale(input.locale);
      if (input.allowPreferenceChange) {
        try {
          if (input.id == undefined) {
            return {
              ok: false,
              error:
                t.exhibitorSettings.table.row3.alerts
                  .errorDeletePreferenceWithoutID,
            };
          }
          await ctx.prisma.foodPreferences.deleteMany({
            where: { id: input.id, exhibitorId: ctx.session.exhibitorId },
          });
          return { ok: true };
        } catch (e) {
          console.log(e);
          return {
            ok: false,
            error: t.error.unknown,
          };
        }
      } else {
        return {
          ok: false,
          error: t.error.changePreferencesAfterDeadline,
        };
      }
    }),
  getJobOffers: protectedProcedure.query(async ({ ctx }) => {
    const exhibitor = await ctx.prisma.exhibitor.findUnique({
      where: {
        id: ctx.session.exhibitorId,
      },
    });

    return await ctx.prisma.jobOffers.findUnique({
      where: {
        id: exhibitor?.jobOfferId,
      },
    });
  }),
  setJobOffers: protectedProcedure
    .input(
      z.object({
        summerJob: z.number().array(),
        internship: z.number().array(),
        partTimeJob: z.number().array(),
        masterThesis: z.boolean(),
        fullTimeJob: z.boolean(),
        traineeProgram: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exhibitor = await ctx.prisma.exhibitor.findUnique({
        where: {
          id: ctx.session.exhibitorId,
        },
      });

      await ctx.prisma.jobOffers.update({
        where: {
          id: exhibitor?.jobOfferId,
        },
        data: {
          summerJob: input.summerJob,
          internship: input.internship,
          partTimeJob: input.partTimeJob,
          masterThesis: input.masterThesis,
          fullTimeJob: input.fullTimeJob,
          traineeProgram: input.traineeProgram,
        },
      });
    }),
    setInfoStatus: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const exhibitor = await ctx.prisma.exhibitor.update({
        where: {
          id: ctx.session.exhibitorId,
        },
        data: {
            infoSubmissionStatus: input
        }
      });


    }),
    getInfoStatus: protectedProcedure
    .query(async ({ ctx }) => {
        const exhibitor = await ctx.prisma.exhibitor.findUnique({
          where: {
            id: ctx.session.exhibitorId,
          },
        });
        if (!exhibitor) return;
        return exhibitor.infoSubmissionStatus
    }),
    getStudentInterests: protectedProcedure
    .query(async ({ ctx }) => {
        const exhibitor = await ctx.prisma.exhibitor.findUnique({
          where: {
            id: ctx.session.exhibitorId,
          },
        });

        if (!exhibitor) return;

        const alreadyBookedMeetings = await ctx.prisma.meetings.findMany({
          where: {
            exhibitorId: ctx.session.exhibitorId,
          },
        });

        const students = await ctx.prisma.students.findMany({
          where: {
            company_meeting_interests: {
              has: exhibitor.id,
            },
          },
          select: {
            id: true,
            ugkthid: true,
            first_name: true,
            last_name: true,
            study_year: true,
            has_cv: true,
            summerJob: true,
            internship: true,
            partTimeJob: true,
            masterThesis: true,
            fullTimeJob: true,
            traineeProgram: true,
          },
        });



        if (!students) return;

        const studentData = JSON.parse(JSON.stringify(students));

        const output = studentData
        .filter((student: any) => student.cv !== null) // remove all without cv
        .filter((student: any) => { // remove all that already have a meeting
          //console.log("meetings", alreadyBookedMeetings);

          var hasMeeting = false;
          alreadyBookedMeetings.forEach((meeting: any) => {
            if(meeting.studentId === student.id) {
              console.log("Student already has a meeting");
              hasMeeting = true;
            }
          })

          return !hasMeeting;
        }).map((student: any) => { //format the output
          const keys = ["summerJob", "internship", "partTimeJob", "thesis", "fullTimeJob", "traineeProgram"]
          const values = [student.summerJob, student.internship, student.partTimeJob, student.masterThesis, student.fullTimeJob, student.traineeProgram]
          return {
            ugkthid: student.ugkthid,
            name: student.first_name + " " + student.last_name,
            year: student.study_year,
            has_cv: student.has_cv,
            other: keys.filter((_, i) => values[i])
          }
        });


        return output;
    }),
    getStudentCV: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      //console.log("Getting CV for student: ", input);
        const student = await ctx.prisma.students.findUnique({
          where: {
            ugkthid: input,
          },
          select: {
            cv: true,
            has_cv: true,
          },
        });
        if(!student || !student.has_cv) throw error("No CV found");

        return student.cv;
    }),
    createMeeting: protectedProcedure
    .input(z.object({
      ugkthid: z.string().trim(),
    }))
    .mutation(async ({ ctx, input }: any) => {
        const exhibitor = await ctx.prisma.exhibitor.findUnique({
          where: {
            id: ctx.session.exhibitorId,
          },
        });

        if (!exhibitor) return;

        const student = await ctx.prisma.students.findUnique({
          where: {
            ugkthid: input.ugkthid,
          },
        });

        if (!student) return;

        const existingMatch = await ctx.prisma.meetings.findMany({
          where: {
            exhibitorId: ctx.session.exhibitorId,
            studentId: student.id,
          },
        });

        if (existingMatch.length > 0) {
          console.log("Match already exists");
          return;
        }

        const match = await ctx.prisma.meetings.create({
          data: {
            exhibitorId: ctx.session.exhibitorId,
            studentId: student.id,
            timeslot: -1,
            createdAt: new Date(),
          },
        });

        console.log("\n\n\n SENDING EMAIL TO STUDENT \n\n\n");

        // change to "locale" if We want multiple languages
        const t = getLocale("en");

        // send email to student that a company y (comapny) has invited student x (student) to a meeting @ilmal
        sendEmail(
          student.email,
          t.meeting_email.meeting_request_to_student.subject(exhibitor.name),
          t.meeting_email.meeting_request_to_student.body(
            student.first_name,
            student.last_name,
            exhibitor.name
          ),
          "sales@ddagen.se"
        );

        console.log("\n\n\n SENDING EMAIL TO STUDENT \n\n\n");

        return match
    }),
    getMeetings: protectedProcedure
    .query(async ({ ctx }) => {
        const meetings = await ctx.prisma.meetings.findMany({
          where: {
            exhibitorId: ctx.session.exhibitorId
          },
        });

        return meetings
    }),
    getTimeSlotsLeft: protectedProcedure
    .query(async ({ ctx }) => {
      const timeSlots = await ctx.prisma.meetings.findMany({
        where: {
            exhibitorId: ctx.session.exhibitorId,
        },
        select: {
            timeslot: true,
        }
      });

      const exhibitorsTimeSlots = await ctx.prisma.exhibitor.findUnique({
          where: {
              id: ctx.session.exhibitorId,
          },
          select: {
              meetingTimeSlots: true,
          }
      }).then((data: any) => data?.meetingTimeSlots ?? []);

      console.log(exhibitorsTimeSlots)
      const timeSlotsArray = timeSlots.map((timeSlot: any) => timeSlot.timeslot);

      const availableTimeSlots = exhibitorsTimeSlots.filter((timeSlot: number) => !timeSlotsArray.includes(timeSlot));

      return availableTimeSlots;
    }),
    getPendingMeetings: protectedProcedure
    .query(async ({ ctx }) => {
        const exhibitor = await ctx.prisma.exhibitor.findUnique({
          where: {
            id: ctx.session.exhibitorId,
          },
        });

        if (!exhibitor) return;

        const studentMeetings = await ctx.prisma.meetings.findMany({
          where: {
            exhibitorId: ctx.session.exhibitorId,
            timeslot: -1,
          },
        });

        if (!studentMeetings) return;

        const studentIds = studentMeetings.map((student: any) => student.studentId);

        const students = await ctx.prisma.students.findMany({
          where: {
            id: {
              in: studentIds,
            },
          },
        });

        const studentData = JSON.parse(JSON.stringify(students));

        const output = studentData.map((student: any) => {
          return {
            ugkthid: student.ugkthid,
            name: student.first_name + " " + student.last_name,
            year: student.study_year,
            has_cv: student.has_cv,
            cv: student.cv
          }
        });

        return output;
    }),
    getAcceptedMeetings: protectedProcedure
    .query(async ({ ctx }) => {
        const exhibitor = await ctx.prisma.exhibitor.findUnique({
          where: {
            id: ctx.session.exhibitorId,
          },
        });

        if (!exhibitor) return;

        const studentMeetings = await ctx.prisma.meetings.findMany({
          where: {
            exhibitorId: ctx.session.exhibitorId,
            timeslot: {
              not: -1,
            },
          },
        });

        // append the timeslot to the student

        if (!studentMeetings) return;

        const studentIds = studentMeetings.map((student: any) => student.studentId);
        const students = await ctx.prisma.students.findMany({
          where: {
            id: {
              in: studentIds,
            },
          },
        });

        const studentData = JSON.parse(JSON.stringify(students));

        // timeslot to the right students
        studentMeetings.forEach((meeting: any) => {
          studentData.forEach((student: any) => {
            if (student.id === meeting.studentId) {
              student.timeslot = meeting.timeslot;
              //console.log("Timeslot: ", student.timeslot);
            }
          });
        });

        const output = studentData.map((student: any) => {
          return {
            ugkthid: student.ugkthid,
            name: student.first_name + " " + student.last_name,
            year: student.study_year,
            has_cv: student.has_cv,
            timeslot: student.timeslot,
          }
        });

        return output;
    }),
    cancelMeeting: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
        const student = await ctx.prisma.students.findUnique({
          where: {
            ugkthid: input,
          },
        });
        if(!student) return;
        console.log(student.id);
        const meeting = await ctx.prisma.meetings.findFirst({
          where: {
            studentId: student.id,
            exhibitorId: ctx.session.exhibitorId,
          },
        });

        if (!meeting) return;

        const exhibitor = await ctx.prisma.exhibitor.findUnique({
          where: {
            id: ctx.session.exhibitorId,
          },
        });

        if (!exhibitor) return;

        console.log("\n\n\n SENDING EMAIL TO COMPANY AND STUDENT \n\n\n");

        // change to "locale" if We want multiple languages
        const t = getLocale("en");

        // send mail to student
        sendEmail(
          student.email,
          t.meeting_email.meeting_deleted_by_company.subject(exhibitor.name),
          t.meeting_email.meeting_deleted_by_company.body(
            student.first_name,
            student.last_name,
            exhibitor.name
          ),
          "sales@ddagen.se"
        );

        await ctx.prisma.meetings.delete({
          where: {
            id: meeting.id,
          },
        });
    }),
});
