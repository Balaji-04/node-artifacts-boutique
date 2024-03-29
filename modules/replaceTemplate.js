function replacePlaceHolder(element, file) {
    const card = file;
    let output = card.replace(/{%NAME%}/g, element.name);
    output = output.replace(/{%ID%}/g, element.id);
    output = output.replace(/{%EMOJI%}/g, element.emoji);
    output = output.replace(/{%SELLER_LOCATION%}/g, element.sellerDetails.sellerLocation);
    output = output.replace(/{%DATE_LISTED%}/g, element.dateListed);
    output = output.replace(/{%PRICE%}/g, element.price);
    output = output.replace(/{%DESCRIPTION%}/g, element.description);
    output = output.replace(/{%QUANTITY%}/g, element.quantity);
    return output;
}

module.exports = replacePlaceHolder;