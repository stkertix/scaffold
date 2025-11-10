import { util } from "./util.js";

export let dto = {
    parse(content, data) {
        let dtoImports = data.fields.map(function (f) {
            let output = "";
            switch (f.type) {
                case "Date":
                    output += `import java.util.Date;\n`
                    break;

                case "String":
                default:
                    break;
            }

            return output;
        }).join("");
        content = content.replaceAll("${dtoImports}", dtoImports);

        // -------------------------------------------------------------------------

        let dtoFields = data.fields.map(function (f) {
            let output = "";

            if (f.fk) {
                output += `    private String ${f.name}Id;\n`;
            } else if (f.type == "Date") {
                output += `    private String ${f.name};\n`;
            } else {
                output += `    private ${f.type} ${f.name};\n`;
            }

            return output;
        }).join("");
        content = content.replaceAll("${dtoFields}", dtoFields);

        // -------------------------------------------------------------------------

        let dtoGetterSetters = data.fields.map(function (f) {
            let output = "";

            if (f.fk) {
                output += `    public String get${util.string.capitalize(f.name)}Id() {\n`;
                output += `        return ${f.name}Id;\n`;
                output += `    }\n\n`;
                output += `    public void set${util.string.capitalize(f.name)}(String ${f.name}Id) {\n`;
                output += `        this.${f.name}Id = ${f.name}Id;\n`;
                output += `    }\n`;
            } else if (f.type == "Date") {
                output += `    public String get${util.string.capitalize(f.name)}() {\n`;
                output += `        return ${f.name};\n`;
                output += `    }\n\n`;
                output += `    public void set${util.string.capitalize(f.name)}(String ${f.name}) {\n`;
                output += `        this.${f.name} = ${f.name};\n`;
                output += `    }\n`;
            } else {
                output += `    public ${f.type} get${util.string.capitalize(f.name)}() {\n`;
                output += `        return ${f.name};\n`;
                output += `    }\n\n`;
                output += `    public void set${util.string.capitalize(f.name)}(${f.type} ${f.name}) {\n`;
                output += `        this.${f.name} = ${f.name};\n`;
                output += `    }\n`;
            }




            return output;
        }).join("\n");
        content = content.replaceAll("${dtoGetterSetters}", dtoGetterSetters);

        return content;
    }
};
