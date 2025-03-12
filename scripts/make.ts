import { argv } from "node:process";
import { templateGenerator } from "ruina-generator";
import { nominator } from "ruina-nominator";

const args = argv.slice(2);

const make = {
  controller: async (args: Array<string>) => {
    const [_, domain, ...filename] = args;

    const controllerFunctionName = nominator(
      `${filename.join(" ")} controller`,
      "",
      "camel-case"
    ).split(".")[0];

    console.log(
      await templateGenerator(
        { name: "controller", path: "templates" },
        { name: filename.join(" "), path: `src/controllers/${domain}` },
        { controller: controllerFunctionName },
        {
          fileNamingPattern: "kebab-case",
          fileType: "ts",
          replaceIfExists: true,
        }
      )
    );
  },
  generator: async () => {},
  middleware: async () => {},
  "repository:interface": async () => {},
  "repository:instance": async () => {},
  route: async () => {},
  schema: async () => {},
  model: async () => {},
  service: async () => {},
};

const target = args[0] as keyof typeof make;

await make[target](args.slice(0));

export default make;
