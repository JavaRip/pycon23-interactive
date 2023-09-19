import DomManager from './classes/DomManager.js'

let NAME; 
let PREDICTION;
let DM = new DomManager();

async function main() {
    DM.setPageContent(
        {
            title: `Hello ${NAME} 🐍`,
            subheading: 'This is a randomly generated name, you can refresh the page to get a new one :)',
            body: "This app will select a random point in the dataset which was taken from a real well in Bangladesh. We will then show the prediction made for this well from the best performing predictive model, then reveal whether that prediction was correct or not.",
        },
        '1'
    );

    DM.setPageContent(
        {
            title: 'Welcome to your new well!',
            subheading: `Your well is based in ${PREDICTION.district}, in the divsion ${PREDICTION.division}`,
            body: `Google Search ${PREDICTION.division} ${PREDICTION.district} to learn more about this well!`,
        },
        '2'
    );

    let p3Title;
    switch(PREDICTION.prediction) {
        case 'safe':
            p3Title = 'The model predicted that this well is safe 😊👍';
            break;
        case 'polluted':
            p3Title = 'The model predicted that this well is polluted 😧👎';
            break;
        
        default:
            console.error(`prediction not recognized ${PREDICTION.prediction}`)
    }

    DM.setPageContent(
        {
            title: p3Title,
            subheading: 'The model that made this prediction has an accuracy of 85%!',
            body: 'This is a strong indication that YOU can drink from this well! With a certainty of 85%, consider how you feel about trusting your primary source of drinking water to this prediction.',
        },
        '3'
    );

    let p4Title;
    let p4Subheading;
    let p4Body;
    switch(PREDICTION.label == PREDICTION.prediction) {
        case true:
            if (PREDICTION.label == 'safe') {
                p4Title = 'The model predicted correctly 😊👍';
                p4Subheading = 'A true negative. This well is safe to drink from.';
                p4Body = "Why did we even worry? This model is right 85% of the time. We were always more than likely to be in this group. Let's just hope that those with an correct prediction understand that the greater good is being achieved.";
            } else {
                p4Title = 'The model predicted correctly 😊👍';
                p4Subheading = 'A true positive. This well is not safe to drink from';
                p4Body = "Why did we even worry? This model is right 85% of the time. We were always more than likely to be in this group. Let's just hope that those with an correct prediction understand that the greater good is being achieved.";
            }
            break;
        case false:
            if (PREDICTION.label == 'safe') {
                p4Title = 'The model predicted incorrectly 😧';
                p4Subheading = 'A false negative. Oh no!';
                p4Body = "The model predicted safe, but the well was actually polluted. If this prediction was created for a real scenario, we would have just told someone  they can't drink from a well which is actually safe. Clean drinking water sources are a key piece of infrastructure and disabling perfectly good sources does real harm."
            } else {
                p4Title = 'The model predicted incorrectly 😧';
                p4Subheading = 'A false positive. Oh no!';
                p4Body = "The model predicted polluted, but the well was actually safe. If this was a real prediction was applied for a real scenario, we would have just told someone to drink from a well that is pollited to drink from. But, maybe that's okay because 85% of the time this doesn't happen? Being that this example represents your well, how does that make you feel?";
            }
            break;
        
        default:
            console.error(`prediction not recognized ${PREDICTION.prediction}`)
    }

    DM.setPageContent(
        {
            title: p4Title,
            subheading: p4Subheading,
            body: p4Body,
        },
        '4'
    );


    DM.navigate(1);
}

async function init() {
    NAME = await fetch('/generateName').then(response => response.text());
    console.log(NAME)
    PREDICTION = await JSON.parse(await fetch('/getPrediction').then(response => response.text()));
    await fetch('/reportPrediction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            prediction: PREDICTION,
            name: NAME,
        }),
    });
    console.log(JSON.stringify(PREDICTION));
    document.querySelector('body').classList.remove('loading');
    main();
}

window.addEventListener('load', async () => {
    await init();
});