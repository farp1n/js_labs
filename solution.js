console.log("Інструкція до функції triangle:");
console.log("Використовуйте: triangle(значення1, 'тип1', значення2, 'тип2')");
console.log("Типи: 'leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'");

function triangle(val1, type1, val2, type2) {
    if (val1 <= 0 || val2 <= 0) {
        console.log("Zero or negative input");
        return "failed";
    }

    let a, b, c, alpha, beta;
    const toRad = (deg) => deg * (Math.PI / 180);
    const toDeg = (rad) => rad * (180 / Math.PI);

    const data = {};
    data[type1] = val1;
    data[type2] = val2;

    if (data['leg'] && data['hypotenuse']) {
        a = data['leg'];
        c = data['hypotenuse'];
        if (a >= c) {
            console.log("Катет не може бути більшим за гіпотенузу");
            return "failed";
        }
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    } 
    else if (type1 === 'leg' && type2 === 'leg') {
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = 90 - alpha;
    }
    else if (data['leg'] && data['adjacent angle']) {
        a = data['leg'];
        beta = data['adjacent angle'];
        if (beta >= 90) return "failed";
        c = a / Math.cos(toRad(beta));
        b = Math.sqrt(c * c - a * a);
        alpha = 90 - beta;
    }
    else if (data['leg'] && data['opposite angle']) {
        a = data['leg'];
        alpha = data['opposite angle'];
        if (alpha >= 90) return "failed";
        c = a / Math.sin(toRad(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    }
    else if (data['hypotenuse'] && data['angle']) {
        c = data['hypotenuse'];
        alpha = data['angle'];
        if (alpha >= 90) return "failed";
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
        beta = 90 - alpha;
    }
    else {
        console.log("Будь ласка, ще раз перечитайте інструкцію");
        return "failed";
    }

    console.log("a = " + a);
    console.log("b = " + b);
    console.log("c = " + c);
    console.log("alpha = " + alpha);
    console.log("beta = " + beta);
    
    return "success"; 
}
