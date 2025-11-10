export let util = {
    test() {
        console.log('TEST!');
    },
    timestamp() {
        let d = new Date();
        let pad = (n) => n.toString().padStart(2, "0");
        // return d;
        return (
            d.getFullYear().toString() + "-" +
            pad(d.getMonth() + 1) + "-" +
            pad(d.getDate()) + " " +
            pad(d.getHours()) + ":" +
            pad(d.getMinutes()) + ":" +
            pad(d.getSeconds())
        );
    },
    string: {
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
};
