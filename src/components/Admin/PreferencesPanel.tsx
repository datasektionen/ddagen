import Locale from "@/locales";
import {
  Exhibitor,
  Preferences,
  sortExhibitors,
  sortPreferences,
} from "@/shared/Classes";

export function PreferencesPanel({
  t,
  exhibitors,
  preferences,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
  preferences: Preferences[];
}) {
  return (
    <div className="w-full h-full text-white">
      <div className="flex flex-col items-center justify-center mt-12 mx-32">
        <div className="w-[80%]">
          <h1 className="text-cerise text-xl md:text-2xl font-medium text-center px-[10px] break-words mb-4">
            {t.admin.preferences.types.banquet}
          </h1>

          <table className="w-full bg-slate-50 bg-opacity-20 border-collapse border-solid">
            <thead className="[&>tr>th]:border-2 [&>tr>th]:border-solid [&>tr>th]:border-cerise [&>tr>th]:py-2 [&>tr>th]:px-8 ">
              <tr>
                <th>{t.admin.preferences.header.exhibitor}</th>
                <th>{t.admin.preferences.header.name}</th>
                <th>{t.admin.preferences.header.choices}</th>
                <th>{t.admin.preferences.header.type}</th>
                <th>{t.admin.preferences.header.comment}</th>
              </tr>
            </thead>
            <tbody
              className="[&>tr>td]:border-2 [&>tr>td]:border-t-2 [&>tr>td]:border-solid 
                      [&>tr>td]:border-cerise [&>tr>td]:p-4 [&>tr>td]:text-center"
            >
              {sortExhibitors(exhibitors).map((exhibitor) => (
                <>
                  {sortPreferences(
                    preferences.filter(
                      (preference) =>
                        preference.exhibitorId == exhibitor.id &&
                        preference.type == "Banquet"
                    )
                  ).map((preference, i) => (
                    <tr key={i}>
                      <td className="break-words">{exhibitor.name}</td>
                      <td>{preference.name}</td>
                      <td>{preference.value.join(", ")}</td>
                      <td>{preference.type}</td>
                      <td>{preference.comment}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>

          <h1 className="text-cerise text-xl md:text-2xl font-medium text-center px-[10px] break-words mt-10 mb-4">
            {t.admin.preferences.types.representatives}
          </h1>

          <table className="w-full bg-slate-50 bg-opacity-20 border-collapse border-solid">
            <thead className="[&>tr>th]:border-2 [&>tr>th]:border-solid [&>tr>th]:border-cerise [&>tr>th]:py-2 [&>tr>th]:px-8 ">
              <tr>
                <th>{t.admin.preferences.header.exhibitor}</th>
                <th>{t.admin.preferences.header.name}</th>
                <th>{t.admin.preferences.header.choices}</th>
                <th>{t.admin.preferences.header.type}</th>
                <th>{t.admin.preferences.header.comment}</th>
              </tr>
            </thead>
            <tbody
              className="[&>tr>td]:border-2 [&>tr>td]:border-t-2 [&>tr>td]:border-solid 
                      [&>tr>td]:border-cerise [&>tr>td]:p-4 [&>tr>td]:text-center"
            >
              {sortExhibitors(exhibitors).map((exhibitor) => (
                <>
                  {sortPreferences(
                    preferences.filter(
                      (preference) =>
                        preference.exhibitorId == exhibitor.id &&
                        preference.type == "Representative"
                    )
                  ).map((preference, i) => (
                    <tr key={i}>
                      <td className="break-words">{exhibitor.name}</td>
                      <td>{preference.name}</td>
                      <td>{preference.value.join(", ")}</td>
                      <td>{preference.type}</td>
                      <td>{preference.comment}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
