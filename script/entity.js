import { util } from "./util.js";

export let entity = {
    parse(content, data) {
        let entityImports = data.fields.map(function (f) {
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
        content = content.replaceAll("${entityImports}", entityImports);

        // -------------------------------------------------------------------------

        let entityFields = data.fields.map(function (f) {
            let output = "";

            if (f.pk) {
                output += `    @Id\n`;
                output += `    @GeneratedValue(generator = "uuid2")\n`;
                output += `    @GenericGenerator(name = "uuid2", strategy = "uuid2")\n`;
                output += `    @Column(name = "id", length = EntityDomain.LENGTH_UUID, nullable = false)\n`;
            } else if(f.fk) {
                output += `    @ManyToOne\n`;
                output += `    @JoinColumn(name = "${f.columnName}", referencedColumnName = "id", foreignKey = @ForeignKey(name = "${data.tableName}_${f.fk}"))\n`;
            } else {
                output += `    @Column(name = "${f.columnName}")\n`;
            }

            output += `    private ${f.type} ${f.name};\n\n`;

            return output;
        }).join("");
        content = content.replaceAll("${entityFields}", entityFields);

        // -------------------------------------------------------------------------

        let entityGetterSetters = data.fields.map(function (f) {
            let output = "";
            output += `    public ${f.type} get${util.string.capitalize(f.name)}() {\n`;
            output += `        return ${f.name};\n`;
            output += `    }\n\n`;
            output += `    public void set${util.string.capitalize(f.name)}(${f.type} ${f.name}) {\n`;
            output += `        this.${f.name} = ${f.name};\n`;
            output += `    }\n`;

            return output;
        }).join("\n");
        content = content.replaceAll("${entityGetterSetters}", entityGetterSetters);

        return content;
    }
};
