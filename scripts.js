function ghConfirm() {
    if(confirm("Confirm redirect to github.com")) {
        window.open("https://github.com/dyeam05", '_blank').focus();
    }
}

function wipButton() {
    alert("Page isn't finished yet, check back later.");
}
// Code inspired by and largely taken from braums' sda-utilities at https://github.com/bramus/sda-utilities/blob/main/src/run-once.js. 
window.addEventListener('load', (e) => {
    //save paragraphtext element as variable
    document.querySelectorAll('.paragraphtext').forEach(($paragraphtext) => {
        const animationName = 'horizontal-slide-in';
        //get the animation from paragraphtext element
        const animations = $paragraphtext.getAnimations();

        //determines whether animation should be stopped
        const shouldAnimationBeStopped = (animation, animationName = null) => {
            if (!(animation.timeline instanceof ScrollTimeline)) return false;

            if (animationName === null) {
                return true;
            }

            return animation.animationName === animationName;
            };
        
        $paragraphtext.addEventListener('animationend', (e) => {
            // animationend is also triggered when back at the start. Ignore those.
            if (e.elapsedTime == 0) return;

            // Extract animation
            // Could get the wrong one though, see https://github.com/w3c/csswg-drafts/issues/9010 for details
            const animation = animations.find((a) => a.animationName == e.animationName);

            // Only process if the animation name matches
            if (shouldAnimationBeStopped(animation, animationName)) {
                // Give a warning when the fill mode is not the correct one
                if (!['forwards', 'both'].includes(animation.effect.getComputedTiming().fill)) {
                    console.warn(`The fillMode for the animation “${animationName}” is not set to \`forwards\`. This can cause a glitch when removing the animation.`);
                }

                // Commit the styles and remove the animation
                animation.commitStyles();
                animation.cancel();
            }
        });

    });
});