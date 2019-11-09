/*
grab the plans from the specified links:

http://catalog.northeastern.edu/archive/2018-2019/undergraduate/computer-information-science/computer-science/bscs/#planofstudytext
http://catalog.northeastern.edu/archive/2018-2019/undergraduate/science/biochemistry/biochemistry-bs/#planofstudytext
http://catalog.northeastern.edu/archive/2018-2019/undergraduate/science/mathematics/mathematics-bs/#planofstudytext

perhaps try with the basic link itself, rather than the #planofstudytext at the end.

then add the prereqs to each of them.
*/

const rp = require("request-promise");
const plan_parser = require("../src/plan_parser");
const prereq_loader = require("../src/prereq_loader");
const fs = require("fs");

const links = [
  "http://catalog.northeastern.edu/archive/2018-2019/undergraduate/computer-information-science/computer-science/bscs",
  "http://catalog.northeastern.edu/archive/2018-2019/undergraduate/science/biochemistry/biochemistry-bs",
  "http://catalog.northeastern.edu/archive/2018-2019/undergraduate/science/mathematics/mathematics-bs",
];

// call produce, write the files.

test("string", async () => {
  await produce(links);
  expect(true).toBeTruthy();
});

/**
 * Produces the full schedules, complete with prereqs, for the specified links.
 */
async function produce(links) {
  // make a request for each of the links.
  const requests = await Promise.all(links.map(link => rp.get(link)));

  // for each of the pages, parse them each into a list of schedules.
  const schedules = requests.map(page =>
    plan_parser.planOfStudyToSchedule(page)
  );

  // for each of the resulting list of schedules, add prereqs to them.
  const withPrereqs = await Promise.all(
    schedules.map(losched => prereq_loader.addPrereqsToSchedules(losched))
  );

  // for each of the schedules, write to files out the results.
  for (let i = 0; i < withPrereqs.length; i += 1) {
    fs.writeFileSync(
      `./schedules${i}.json`,
      JSON.stringify({ data: withPrereqs[i] }, null, 2)
    );
  }

  return undefined;
}
