const { google } = require("googleapis");
const helperFunction = require("../helper/helperFunction");

const googleSheets = google.sheets({ version: "v4", auth: async () => await auth.getClient() });

exports.getAllData = async (req, res, sheetName) => {
    try {
        // Read rows from spreadsheet
        const getRows = await req.googleSheets.spreadsheets.values.get({
            auth: req.auth,
            spreadsheetId: req.sheetId,
            range: req.sheetName,
        });
        // res.send(getRows.data.values);
        const obj = getRows.data.values;

        var width = obj[0].length;

        var depth = obj.length;
        // console.log(width, depth);

        var keys = "";
        for (let i = 0; i < width; i++) {
            keys = [...keys, obj[0][i]];
        }
        var values = [];
        for (let i = 1; i < depth; i++) {
            for (let j = 0; j < width; j++) {
                values.push([keys[j], obj[i][j]]);
            }
        }

        var gg = [];
        var finalData = [];

        var flag = 0;

        for (let k = 0; k < values.length; k++) {
            flag++;

            gg.push(values[k]);

            if (flag == width) {
                finalData.push(Object.fromEntries(gg));
                gg = [];
                flag = 0;
            }
        }
        return res
            .status(200)
            .json({ Status: 1, Message: "Fetched Successfully", Data: finalData });
    } catch (error) {
        return res
            .status(403)
            .json({ Status: 0, Message: "no data found", });
    }
};

exports.getDataById = async (req, res) => {
    //const id = 7;
    const id = req.params.id
    console.log(id);
    // const id = 7;
    // const data = await Sheet.find({ sheetName });

    // var sheetId = data[0].sheetId;

    try {
        // Read rows from spreadsheet
        const getRows = await req.googleSheets.spreadsheets.values.get({
            auth: req.auth,
            spreadsheetId: req.sheetId,
            range: req.sheetName,
        });
        // res.send(getRows.data.values);
        const obj = getRows.data.values;

        var width = obj[0].length;

        var depth = obj.length;
        // console.log(width, depth);

        var keys = "";
        for (let i = 0; i < width; i++) {
            keys = [...keys, obj[0][i]];
        }
        var values = [];
        // for (let i = 1; i < depth; i++) {
        for (let j = 0; j < width; j++) {
            values.push([keys[j], obj[id][j]]);
        }
        // }

        var gg = [];
        var finalData = [];

        var flag = 0;

        for (let k = 0; k < values.length; k++) {
            flag++;

            gg.push(values[k]);

            if (flag == width) {
                finalData.push(Object.fromEntries(gg));
                gg = [];
                flag = 0;
            }
        }
        return res
            .status(200)
            .json({ Status: 1, Message: "Fetched Successfully", Data: finalData });
        // return res.send(finalData);
    } catch (error) {
        return res
            .status(403)
            .json({ Status: 0, Message: "no data found", });
    }
};

exports.Adddata = async (req, res) => {
    try {

        const getRows = await req.googleSheets.spreadsheets.values.get({
            auth: req.auth,
            spreadsheetId: req.sheetId,
            range: req.sheetName,
        });
        const obj = getRows.data.values;
        var id = obj.length;

        const {
            A = id,
            B = null,
            C = null,
            D = null,
            E = null,
            F = null,
            G = null,
            H = null,
            I = null,

        } = req.body;

        helperFunction.mailerFun({ B, C, D, E, F, G, H, I });
        const idd = parseInt(A);

        const response = await req.googleSheets.spreadsheets.values.update({
            auth: req.auth,
            spreadsheetId: req.sheetId,
            valueInputOption: "USER_ENTERED",
            range: `${req.sheetName}!A${idd + 1}:Z${idd + 1}`,
            resource: {
                values: [
                    [
                        A,
                        B,
                        C,
                        D,
                        E,
                        F,
                        G,
                        H,
                        I

                    ],
                ],
            },
        });


        return res
            .status(200)
            .json({ status: 1, Message: `Successfully Updated With ID ${id}` });
    } catch (error) {
        return res
            .status(403)
            .json({ Status: 0, Message: "somthing want wrong", });
    }
};


