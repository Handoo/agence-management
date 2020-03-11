const connection = require('../database');
// Require the controllers
const personneRef = require('./personneRef');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {

    // =============================================================
    // ================== COMMAND ===================================
    // =============================================================
    // Add a client
    addClient: (params) => {

        // Params that come on page register a client (/command)
        firstName = params.body.firstName;
        lastName = params.body.lastName;
        nationality = params.body.nationality;
        dateOfBirth = params.body.dateOfBirth;
        placeOfBirth = params.body.placeOfBirth;
        passportNumber = params.body.passportNumber;
        nif = params.body.nif;
        nin = params.body.nin;
        phone = params.body.phone;
        //
        statut = params.body.statut;
        passportType = params.body.passportType;
        pieceList = params.body.pieceList;
        //
        firstNameRef = params.body.firstNameRef;
        lastNameRef = params.body.lastNameRef;
        phoneRef = params.body.phoneRef;




        // Insetr info client to database
        let sqlPersonne = "INSERT INTO personne (firstName, lastName, nationality, dateOfBirth, placeOfBirth, passportNumber, nif, nin, phone) VALUES ('" + firstName + "','" + lastName + "','" + nationality + "','" + dateOfBirth + "','" + placeOfBirth + "','" + passportNumber + "','" + nif + "','" + nin + "','" + phone + "')"
        connection.query(sqlPersonne, (err, result) => {
            if (err) throw err;
            idClient = result.insertId;
            console.log('Personne inserted');

            // Add info to client table (that link to the personne table)
            let sqlClient = "INSERT INTO client (id_personne, statut, passport_type) VALUES ('" + idClient + "','" + statut + "','" + passportType + "')"
            connection.query(sqlClient, (err, result) => {
                if (err) throw err;
                console.log("Client link inserted");

                // Add Personne reference
                let sqlPerRef = "INSERT INTO personne (firstName, lastName, phone) VALUES ('" + firstNameRef + "','" + lastNameRef + "','" + phoneRef + "')"
                connection.query(sqlPerRef, (err, result) => {
                    if (err) throw err;
                    idPersonneRef = result.insertId;
                    console.log("Personne Ref inserted");

                    // Add info to personne_reference table (that link to the personne table)
                    let sqlRef = "INSERT INTO personne_reference (id_client, id_personne) VALUES ('" + idClient + "','" + idPersonneRef + "')"
                    idPersonneRef = result.insertId;
                    connection.query(sqlRef, (err, result) => {
                        if (err) throw err;
                        console.log("Personne Ref link inserted");

                        // Add info to personne_reference table (that link to the personne table)
                        let sqlupdate = "UPDATE client SET id_personne_ref  = '" + idPersonneRef + "' WHERE client.id_personne = '" + idClient + "'"
                        idPersonneRef = result.insertId;
                        connection.query(sqlupdate, (err, result) => {
                            if (err) throw err;
                            console.log("Update  inserted");
                        });
                    });
                });

            });
            console.log(phone);
            
            client.messages.create({
                body: firstName + ' nou resevwa komand passport ou a',
                from: '++15162724904',
                to: '+509' + phone,
            }).then(message => console.log(message.sid));
        })
    },


    // =============================================================
    // ================== CLIENT ===================================
    // =============================================================
    // Find all clients

    clientList: async () => {
        let promise = new Promise((resolve, reject) => {
            let sql = "SELECT * FROM personne, client WHERE client.id_personne = personne.id";
            connection.query(sql, async (err, result) => {
                if (err) throw (err);
                let allCLientAndTheirReference = [];
                for (let i = 0; i < result.length; i++) {
                    element = result[i];
                    id_personne_ref = element.id_personne_ref
                    persRef = await personneRef.personneRefById(id_personne_ref);
                    personneRefName = persRef[0].firstName + ' ' + persRef[0].lastName;

                    let oneClientAndReference = {
                        firstName: element.firstName,
                        lastName: element.lastName,
                        phone: element.phone,
                        passportNumber: element.passportNumber,
                        passportType: element.passport_type,
                        personRes: personneRefName,

                    };
                    allCLientAndTheirReference.push(oneClientAndReference);
                };
                resolve(allCLientAndTheirReference);
            });

        });
        return await promise;
    },

    requiredPieces: async (typePersonne, typePassport) => {
        let promise = new Promise((resolve, reject) => {
            let sql = "SELECT * FROM pieces_requises, pieces WHERE pieces.id = pieces_requises.id_pieces AND type_personne = '" + typePersonne + "' AND type_passport = '" + typePassport + "'";
            connection.query(sql, async (err, result) => {
                if (err) throw (err);
                resolve(result);
            });

        });
        return await promise;
    },

};