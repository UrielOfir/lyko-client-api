const is_strings_equal = (string1, string2) => {
    let change = "";
    const isDiff = [...string1].some((char, index) => {
        if (char !== string2.charAt(index)) {
            console.log(char.charCodeAt(0), string2.charCodeAt(index));
            change = `something changed in index ${index}\n in string1 the chars are: ${string1.slice(index, index + 50)}\nin string2 the chars are: ${string2.slice(index, index + 50)}\n`
            return true
        }
    })
    if (isDiff) {
        return false;
    }
    return true;
}

export default is_strings_equal;

