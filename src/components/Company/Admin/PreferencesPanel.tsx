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
  function toCSV(rows: (string | number)[][], headers: string[]) {
    const header = headers.join(",");
    const body = rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    );
    return [header, ...body].join("\n");
  }

  function downloadCSV(filename: string, csv: string) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); 
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); 
    link.target = '_blank';
    link.download = filename;
    link.click(); 
  }

  function exportPreferencesCSV(type: "Banquet" | "Representative") {
    const headers = [
      "Exhibitor",
      "Name",
      "Choices",
      "Type",
      "Comment",
    ];

    const rows: (string | number)[][] = [];

    sortExhibitors(exhibitors).forEach((exhibitor) => {
      sortPreferences(
        preferences.filter(
          (p) => p.exhibitorId === exhibitor.id && p.type === type
        )
      ).forEach((preference) => {
        rows.push([
          exhibitor.name,
          preference.name,
          preference.value.length === 0
            ? t.admin.preferences.none
            : preference.value.join(", "),
          preference.type,
          preference.comment,
        ]);
      });
    });

    const csv = toCSV(rows, headers);
    downloadCSV(`${type.toLowerCase()}-preferences.csv`, csv);
  }
  
  return (
    <div className="w-full h-full text-white">
      <div className="flex flex-col items-center justify-center mt-12 ">
        <div className="w-[80%]">
          <div className="overflow-x-auto">
            <h1 className="text-cerise text-xl md:text-2xl font-medium text-center px-[10px] break-words mb-4">
              {t.admin.preferences.types.banquet}
            </h1>

            <button
              onClick={() => exportPreferencesCSV("Banquet")}
              className="mb-4 px-4 py-2 bg-cerise text-white rounded-lg hover:opacity-80"
            >
              Download Banquet CSV
            </button>

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
                        <td>
                          {preference.value.length == 0
                            ? t.admin.preferences.none
                            : preference.value.join(", ")}
                        </td>
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


            <button
              onClick={() => exportPreferencesCSV("Representative")}
              className="mb-4 px-4 py-2 bg-cerise text-white rounded-lg hover:opacity-80"
            >
              Download Representatives CSV
            </button>

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
                        <td>
                          {preference.value.length == 0
                            ? t.admin.preferences.none
                            : preference.value.join(", ")}
                        </td>
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
    </div>
  );
}
