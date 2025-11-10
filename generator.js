import fs from "fs";
import path from "path";
import { util } from "./script/util.js";
import { entity } from "./script/entity.js";
import { dto } from "./script/dto.js";
import { mapper } from "./script/mapper.js";
import { fileURLToPath } from "url";

// Utility to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get arguments from the command line
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("❌ Please include a model file or folder, example");
    console.error("   node generator.js ./models");
    console.error("   node generator.js ./model.json");
    process.exit(1);
}

const inputPath = args[0];
const absolutePath = path.isAbsolute(inputPath)
    ? inputPath
    : path.join(__dirname, inputPath);

// Template and output location
const templatesDir = path.join(__dirname, "templates");
const outputDir = path.join(__dirname, "output");

// Make sure the output directory is available
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });


/**
 * Capitalize string
 * -----------------------------------------------------------------------------
 */

// function capitalize(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }



/**
 * Utility render template
 * -----------------------------------------------------------------------------
 */
function renderTemplate(templatePath, data) {

    data.timestamp = util.timestamp();
    let content = fs.readFileSync(templatePath, "utf-8");

    // Replace placeholders
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === "string") {
            content = content.replaceAll(`\${${key}}`, value);
        }
    }

    if (Array.isArray(data.fields)) {

        /**
         * Entity Fields
         * -------------------------------------------------------------------------
         */

        content = entity.parse(content, data);

        /**
         * DTO fields
         * -------------------------------------------------------------------------
         */

        content = dto.parse(content, data);

        /**
         * Mapper Setter
         * -------------------------------------------------------------------------
         */

        content = mapper.parse(content, data);

        /**
         * 
         * -------------------------------------------------------------------------
         */
    }

    return content;
}

/**
 * Generate
 * -----------------------------------------------------------------------------
 */
function generate(templateName, outputFile, model) {
    const tplPath = path.join(templatesDir, templateName);
    if (!fs.existsSync(tplPath)) {
        console.warn(`⚠️ Template not found: ${templateName}`);
        return;
    }

    const content = renderTemplate(tplPath, model);
    const outPath = path.join(outputDir, outputFile);
    fs.writeFileSync(outPath, content);
    console.log(`✅ Generated ${outputFile}`);
}


/**
 * Generate all files from one model
 * -----------------------------------------------------------------------------
 */
function generateAll(model) {
    generate("Entity.java.tpl", `${model.className}.java`, model);
    generate("Repository.java.tpl", `${model.className}Repository.java`, model);
    generate("Service.java.tpl", `${model.className}Service.java`, model);
    generate("Controller.java.tpl", `${model.className}Controller.java`, model);
    generate("DTO.java.tpl", `${model.className}DTO.java`, model);
    generate("Mapper.java.tpl", `${model.className}Mapper.java`, model);
    console.log(`✨ All files for ${model.className} succesfully generated!\n`);
}

/**
 * Run Generator
 * -----------------------------------------------------------------------------
 */

// Multiple files in directory
if (fs.lstatSync(absolutePath).isDirectory()) {

    // If directory → process all .json files
    const files = fs.readdirSync(absolutePath).filter((f) => f.endsWith(".json"));

    if (files.length === 0) {
        console.error("❌ There is no .json file in the models directory.");
        process.exit(1);
    }

    for (const file of files) {
        const modelPath = path.join(absolutePath, file);
        const model = JSON.parse(fs.readFileSync(modelPath, "utf-8"));
        generateAll(model);
    }
}

// Single file
else {
    const model = JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
    generateAll(model);
}

console.log("✅ All processes are complete!");
