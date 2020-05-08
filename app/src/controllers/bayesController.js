// ============== Include ===========
const include = require('../../modules');
const Math = include.math

// ================= Constant =============

async function bayes(req, res) {
    let lung_cancer = {
        digital_clubbing: 0.96,
        coughing_blood: 0.81,
        weight_loss: 0.76,
        lack_of_appetite: 0.84,
        shortness_of_breath: 0.68,
        chest_pain: 0.52,
        fatigue: 0.76,
        fever: 0,
        headache: 0,
        cough: 0.50
    }

    let tuberculosis = {
        persistent_cough: 0,
        weight_loss: 0.6,
        fatigue: 0.65,
        lack_of_appetite: 0,
        fever: 0.55,
        night_sweats: 0.53,
        coughing_blood: 0.30
    }

    let pneumonia = {
        cough: 0,
        fever: 0,
        shaking_chills: 0,
        shortness_of_breath: 0
    }

    let diseases = [lung_cancer, tuberculosis, pneumonia]

    let limit = 1.00

    //generate random hypothesis probabuluty
    for (let i = 0; i < diseases.length; i++) {
        if (i == (diseases.length - 1)) {
            diseases[i].hypothesis_probability = limit.toFixed(2)
            console.log(i, diseases[i].hypothesis_probability);
            break
        }

        let hypothesis_probability = (Math.random() * (limit) + 0).toFixed(2)
        diseases[i].hypothesis_probability = hypothesis_probability

        limit -= hypothesis_probability

        console.log(i, diseases[i].hypothesis_probability);
    }

    let evidence = ['cough', 'fatigue', 'weighy_loss'];
    let final_probability = []

    for(let i = 0; i < evidence.length; i++) {
        let numerator = numerator_generator(diseases, evidence)
        let denominator = denominator_generator(diseases, evidence)
    }
    
    
}

async function numerator_generator(diseases, evidence) {

}

async function denominator_generator(diseases, evidence) {
    
}

exports.bayes = bayes;