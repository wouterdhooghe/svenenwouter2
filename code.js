selected = function (node) {
      
var filtered = node.filter(function (node) {
  return node.isFunctionNode && node.name === 'Select';
});

return filtered;

}

updateEval = function (node) {
    
    antwoord = equation.compile().eval();
    antwoord ? result.innerHTML = antwoord.toString() : result.value = '' ;
    
};

updateLatex = function (node) {
    try {
        // update expression

        expr.value = equation;

      // export the expression to LaTeX
        var latex = node ? node.toTex({parenthesis: parenthesis, implicit: implicit}) : '';
//      console.log('LaTeX expression:', latex);
        var largeLatex = '\\large ' + latex;
        var hugeLatex = '\\Huge ' + latex;

      // display and re-render the expression
      katex.render(largeLatex, pretty);
    }
    catch (err) {pretty.innerHTML = "error!!!"}
    updateEval(node);
}

updateLatex(equation);

// verplaatst de selectie naar het gevraagde adress
// past global variabele equation aan!
function MoveSelectToAdress(selectAdress,newAdress,eq) {
    // select eruit halen (dit werkt is getest)
    var cleanedEquation = eq.transform(function (child, path, parent) {
        if (child.fn == 'Select') {return child.args[0] } else { return child};
    });
console.log('cleaned');

 eq = injectAtAdress(selectIt(readAtAdress(newAdress, cleanedEquation)),newAdress,cleanedEquation);
 console.log('injected');
 equation = eq;

};

function replaceWithPlus() {
//    expr.value = 'Plus(3, Times(3, Select(4), 5), 7)';

substitution = 'Select(x) + y';
equation = substituteSelected( substitution, equation);
updateLatex(equation);
}

function replaceWithTimes() {

substitution = 'Select(a) * b';
equation = substituteSelected( substitution, equation);
updateLatex(equation);
}
function replaceWithPower() {

substitution = 'Select(a) ^ b';
equation = substituteSelected( substitution, equation);
updateLatex(equation);

}
function replaceWithMinus() {

substitution = '(Select(a)-b)';
equation = substituteSelected( substitution, equation);
updateLatex(equation);
}
function replaceWithDivide() {

substitution = 'Select(a) / b';
equation = substituteSelected( substitution, equation);
updateLatex(equation);
}
function replaceWithNthroot() {

substitution = 'nthRoot(Select(a),b)';
equation = substituteSelected( substitution, equation);
updateLatex(equation);
}
function replaceWithEquality() {
    equation = math.parse('Select(a)==b');
    updateLatex(equation);
}

function leftSelect(eq) {

// bereken het nieuwe adres voor select
// dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties 
selectAdress = adresses('Select',eq)[0];
console.log('selectAdress: ');
console.log(selectAdress);

// als Select maar 1 kind heeft: doe niks: ONDERSTAANDE CODE WERKT NIET WANT MOET OVER PARENT GAAN IPV OVER selectNode
// eigenlijk moet dit niet niet gecontroleerd worden voor links
// selectNode = readAtAdress(selectAdress,eq);
// if (selectNode.args[1] == undefined) {console.log('only one argument'); return};
// console.log('more than one argument');

    // als Select al de root is: doe niks
    if (eq.fn == 'Select') {return}; 

// vind het nummer van dit argument
if (selectAdress[selectAdress.length - 1] == 'content') {
    huidigNummer = 0;
} 
else {
    huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length -1])[0]);
};

upAdress = returnWithoutLast(selectAdress);
console.log('upAdress: ');
console.log(upAdress);

nieuwNummer = Math.max(0,huidigNummer - 1);

if (selectAdress[selectAdress.length - 1] == 'content') {
    leftAdress = upAdress.concat(['content']);
} 
else {
    leftAdress = upAdress.concat(['args[' + nieuwNummer +']']);
};

console.log('leftAdress: ');
console.log(leftAdress);

MoveSelectToAdress(selectAdress,leftAdress,eq);

updateLatex(equation);

}

function rightSelect(eq) {
    // bereken het nieuwe adres voor select
// dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties 
selectAdress = adresses('Select',eq)[0];
console.log('selectAdress: ');
console.log(selectAdress);

// als Select maar 1 kind heeft: doe niks: ONDERSTAANDE CODE WERKT NIET WANT MOET OVER PARENT GAAN IPV OVER selectNode
// eigenlijk moet dit niet niet gecontroleerd worden voor links
// selectNode = readAtAdress(selectAdress,eq);
// if (selectNode.args[1] == undefined) {console.log('only one argument'); return};
// console.log('more than one argument');

    // als Select al de root is: doe niks
    if (eq.fn == 'Select') {return}; 

// vind het nummer van dit argument, en het aantal argumenten
if (selectAdress[selectAdress.length - 1] == 'content') {
    huidigNummer = 0;
} 
else {
    huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length -1])[0]);
};
console.log('huidigNummer: ');
console.log(huidigNummer);

upAdress = returnWithoutLast(selectAdress);
console.log('upAdress: ');
console.log(upAdress);

upNode = readAtAdress(upAdress, eq);
upNode.args == undefined ? laatsteNummer = 0 : laatsteNummer = upNode.args.length - 1;
console.log('laatsteNummer: ' + laatsteNummer);

nieuwNummer = Math.min(huidigNummer + 1,laatsteNummer);
console.log('nieuwNummer: ' + nieuwNummer);

if (selectAdress[selectAdress.length - 1] == 'content') {
    rightAdress = upAdress.concat(['content']);
} 
else {
    rightAdress = upAdress.concat(['args[' + nieuwNummer +']']);
};
console.log('rightAdress: ');
console.log(rightAdress);

MoveSelectToAdress(selectAdress,rightAdress,eq);

updateLatex(equation);
}

function upSelect(eq) {
    // als Select al de root is: doe niks
if (eq.fn == 'Select') {return}; 
    // bereken het nieuwe adres voor select

// dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties    
selectAdress = adresses('Select',eq)[0];
console.log('selectAdress: ');
console.log(selectAdress);

upAdress = returnWithoutLast(selectAdress);
console.log(' upAdress: ');
console.log(upAdress);

//     // select eruit halen (dit werkt is getest)
//     var cleanedEquation = eq.transform(function (child, path, parent) {
//         if (child.fn == 'Select') {return child.args[0] } else { return child};
//     });
// console.log('cleaned');

//  eq = injectAtAdress(selectIt(readAtAdress(upAdress, cleanedEquation)),upAdress,cleanedEquation);
//  console.log('injected');
//  equation = eq;

MoveSelectToAdress(selectAdress,upAdress,eq);

updateLatex(equation);
}

function downSelect(eq,actionName) {

// dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties    
selectAdress = adresses('Select',eq)[0];
console.log('selectAdress: ');
console.log(selectAdress);

selectNode = readAtAdress(selectAdress,eq);

// als Select een leaf is: doe niks
    if (selectNode.args[0].args == undefined & selectNode.args[0].content == undefined) {return};
// ALLEEN ALS GEEN CONTENT ALS CONTENT DAN select.adress.content
if (selectNode.args[0].content == undefined) {downAdress = selectAdress.concat(['args[0]']);} 
else if (selectNode.args[0].args == undefined) {downAdress = selectAdress.concat(['content']);}
else {return};

console.log(' downAdress: ');
console.log(downAdress);

//     // select eruit halen (dit werkt is getest)
//     var cleanedEquation = eq.transform(function (child, path, parent) {
//         if (child.fn == 'Select') {return child.args[0] } else { return child};
//     });
// console.log('cleaned');

//  eq = injectAtAdress(selectIt(readAtAdress(downAdress, cleanedEquation)),downAdress,cleanedEquation);
//  console.log('injected');
//  equation = eq;

MoveSelectToAdress(selectAdress,downAdress,eq);

// noteer dat er een succesvolle downselect is gebeurd
keysList.push(actionName);
// update de latexweergave
updateLatex(equation);

}