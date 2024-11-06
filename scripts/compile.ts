import * as fs from "fs";
import process from "process";
import { Cell } from "ton-core";
import { compileFunc } from "@ton-community/func-js";
import { error } from "console";

async function compileScript() {

    console.log("=====================");

    console.log("Compile scrpt is currently running, let's find some funC code to compile");

    const compileResult = await compileFunc({
        targets: ["./contracts/main.fc"],
        sources: (x) => fs.readFileSync(x).toString("utf8"),
    });

    if(compileResult.status === "error") {
        console.log("compilation process failed. Error:" + compileResult.message);
        process.exit(1);
    }

    console.log("compilation process successful");

    const hexArtifact = "build/main.compiled.json";

    fs.writeFileSync(
        hexArtifact,
        JSON.stringify({
            hex: Cell.fromBoc(Buffer.from(compileResult.codeBoc, "base64"))[0]
            .toBoc()
            .toString("hex"),
        })
    );

    console.log("Compile code was saved to: " + hexArtifact);

}

compileScript();