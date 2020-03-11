const connection = require('../database');

module.exports = {

    // Find all Personne Reference
    personneRefById: async (id_personne_ref) => {

        let promise = new Promise((resolve, reject) => { 
            let sql = "SELECT firstName, lastName, phone FROM personne, personne_reference, client WHERE personne.id = '"+id_personne_ref+"' AND client.id_personne_ref = '"+id_personne_ref+"'"
            connection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result);
            });
        });
        return await promise;
    },

};
