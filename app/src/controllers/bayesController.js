// ============== Include ===========
const include = require('../../modules');
const Math = include.math

// ================= Constant =============

async function bayes(req, res) {
    try {
        let data = req.query
        console.log(data);
        let evidence = data.evidence
        let lung_cancer = {
            name: 'lung_cancer',
            hypothesis_probability: data.lung_cancer_probability,
            digital_clubbing: 0.96,
            coughing_blood: 0.81,
            weight_loss: 0.76,
            lack_of_appetite: 0.84,
            shortness_of_breath: 0.68,
            chest_pain: 0.52,
            fatigue: 0.76,
            fever: 1,
            headache: 1,
            cough: 0.50
        }

        let tuberculosis = {
            name: 'tuberculosis',
            hypothesis_probability: data.tuberculosis_probability,
            persistent_cough: 1,
            weight_loss: 0.6,
            fatigue: 0.65,
            lack_of_appetite: 1,
            fever: 0.55,
            night_sweats: 0.53,
            coughing_blood: 0.30
        }

        let pneumonia = {
            name: 'pneumonia',
            hypothesis_probability: data.pneumonia_probability,
            cough: 1,
            fever: 1,
            shaking_chills: 1,
            shortness_of_breath: 1
        }

        let diseases = [lung_cancer, tuberculosis, pneumonia]

        // let limit = 1.00

        //generate random hypothesis probabuluty
        // for (let i = 0; i < diseases.length; i++) {
        //     if (i == (diseases.length - 1)) {
        //         diseases[i].hypothesis_probability = limit.toFixed(2)
        //         console.log(i, diseases[i].hypothesis_probability);
        //         break
        //     }

        //     let hypothesis_probability = (Math.random() * (limit) + 0).toFixed(2)
        //     diseases[i].hypothesis_probability = hypothesis_probability

        //     limit -= hypothesis_probability

        //     console.log(i, diseases[i].hypothesis_probability);
        // }

        let final_probability = []
        let probability = 0
        let numerator = 0
        let denominator = denominator_generator(diseases, evidence)
        
        for (let i = 0; i < evidence.length; i++) {
            numerator = numerator_generator(diseases, evidence, i).toFixed(4)
            probability = (numerator / denominator).toFixed(4)

            final_probability.push({
                name: diseases[i].name,
                probability
            })

            numerator = 0
            probability = 0
        }

        res.status(200).json({
            pesan: "Perhitungan Bayes Reasoning berhasil",
            probability: final_probability
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

function numerator_generator(diseases, evidence, i) {
    let temp = 1
    for (let j = 0; j < evidence.length; j++) {
        temp = temp * diseases[i][evidence[j]] || 0;
    }

    let numerator = temp * diseases[i].hypothesis_probability
    return numerator
}

function denominator_generator(diseases, evidence) {
    let temp = 1
    let denominator = 0
    for (let i = 0; i < evidence.length; i++) {
        for (let j = 0; j < evidence.length; j++) {
            temp = temp * diseases[i][evidence[j]] || 0;

        }
        let x = temp * diseases[i].hypothesis_probability
        denominator += x

        temp = 1
    }

    return denominator
}

exports.bayes = bayes;