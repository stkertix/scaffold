import { util } from "./util.js";

export let mapper = {
    parse(content, data) {
        let mapperImports = data.fields.map(function (f) {
            let output = "";
            switch (f.type) {
                case "Date":
                    output += `import java.text.SimpleDateFormat;\n`
                    break;

                case "String":
                default:
                    break;
            }

            return output;
        }).join("");
        content = content.replaceAll("${mapperImports}", mapperImports);

        // -------------------------------------------------------------------------

        let mapperSetters = data.fields.map(function (f) {
            let output = "";

            if (f.fk) {
                output += `        \n`;
            } else if (f.type == "Date") {
                output += `\n`;
                output += `        String str${util.string.capitalize(f.name)} = "";\n`;
                output += `        if (o.get${util.string.capitalize(f.name)}() != null) {\n`;
                output += `            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");\n`;
                output += `            str${util.string.capitalize(f.name)} = formatter.format(o.get${util.string.capitalize(f.name)}());\n`;
                output += `        }\n`;
                output += `        dto.set${util.string.capitalize(f.name)}(str${util.string.capitalize(f.name)});\n`;
            } else {
                output += `        dto.set${util.string.capitalize(f.name)}(o.get${util.string.capitalize(f.name)}());\n`;
            }

            return output;
        }).join("");
        content = content.replaceAll("${mapperSetters}", mapperSetters);

        return content;
    }
};
