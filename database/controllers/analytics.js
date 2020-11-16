const connection = require('../database');

module.exports = {

    // Find all Personne Reference
    numberOfCLients: async () => {
        let promise = new Promise((resolve, reject) => {
            let sql = "SELECT COUNT(*) AS nb_client FROM personne, client WHERE client.id_personne = personne.id"
            connection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result[0].nb_client);
            });
        });
        return await promise;
    },

    
    numberOfCLientsPerMonth: async () => {
        let promise = new Promise((resolve, reject) => {
            let sql = "SELECT COUNT(*) AS nb_client_per_month FROM client WHERE MONTH(register_date) = MONTH(CURRENT_DATE())"
            connection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result[0].nb_client_per_month);
            });
        });
        return await promise;
    },

    

    // Find all new passport
    listNewPassport: async () => {
        let promise = new Promise((resolve, reject) => {
            let sql = "SELECT COUNT(*) AS new_passport FROM client WHERE client.passport_type = 'Nouveau'"
            connection.query(sql, (err, result) => {
                if (err) throw err;
                console.log(result)
                resolve(result[0].new_passport);
            });
        });
        return await promise;
    },

    // Find all new passport
    listReNewPassport: async () => {
        let promise = new Promise((resolve, reject) => {
            let sql = "SELECT COUNT(*) AS renew_passport FROM client WHERE client.passport_type = 'Renouvellement'"
            connection.query(sql, (err, result) => {
                if (err) throw err;
                console.log(result)
                resolve(result[0].renew_passport);
            });
        });
        return await promise;
    },
};
