regels = {

    //TODO schrijf functies die nu allemaal de unaryMinus doen!

    introlog: {
        naam: 'ontschrap aalog = schrijf x als log',
        input: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('log(pow(a,x),a)'),
            unknowns: ['a', 'x']
        },
    }, 

    intrologrekenmachine: {
        naam: 'ontschrap logaa = schrijf product van 2 logs',
        input: {
            expr: math.parse('Plus(a,unaryMinus(a))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        },
    }, 
    introExp: {
        naam: 'ontschrapaloga = schrijf x als een macht',
        input: {
            expr: math.parse('x'),
            unknowns: ['x']
        },
        output: {
            expr: math.parse('pow(log(a,x),a)'),
            unknowns: ['x','a']
        },
    }, 
    introExp1: {
        naam: 'eerste macht doet niks',
        input: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('pow(a,1)'),
            unknowns: ['a']
        }
    },
    introWortel: {
        naam: 'schrijf als een wortel',
        input: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('nthRoot(pow(a,n),n)'),
            unknowns: ['a']
        }
    },
    introMaal: {
        naam: 'factor 1 doet niks',
        input: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('Times(1,a)'),
            unknowns: ['a']
        }
    },
    schraplogaa: {
        naam: 'schraplogaa',
        input: {
            expr: math.parse('Times(log(a,b),log(x,a))'),
            unknowns: ['a','b','x']
        },
        output: {
            expr: math.parse('log(x,b)'),
            unknowns: ['b','x']
        },
    },
    schrapaalog: {
        naam: 'schrapaalog',
        input: {
            expr: math.parse('pow(a,log(x,a))'),
            unknowns: ['a','x']
        },
        output: {
            expr: math.parse('x'),
            unknowns: ['x']
        },
    }, 
    schrapaloga: {
        naam: 'schrapaloga',
        input: {
            expr: math.parse('log(pow(a,x),a)'),
            unknowns: ['a','x']
        },
        output: {
            expr: math.parse('x'),
            unknowns: ['x']
        },
    }, 
    schrapExp1: {
        naam: 'eerste macht doet niks',
        input: {
            expr: math.parse('pow(a,1)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        }
    },
    schrapExp0: {
        naam: 'nulde macht is 1',
        input: {
            expr: math.parse('pow(a,0)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1'),
            unknowns: []
        }
    },

    logBuitenMaalHalen: {
        naam: 'direct voor prod en voor deling?',
        input: {
            expr: math.parse('Plus(a,unaryMinus(a))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        },
    }, 
    logBuitenExpHalen: {
        naam: 'direct voor prod en voor deling?',
        input: {
            expr: math.parse('Plus(a,unaryMinus(a))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        },
    }, 
    test: {
        naam: 'test',
        input: {
            expr: math.parse('Plus(a,unaryMinus(a))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        },
    }, 

    schrapMin: {
        naam: 'a min a',
        input: {
            expr: math.parse('Plus(a,unaryMinus(a))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        },
    },

    nulNeutraalVoorPlus: {
        naam: '0 neutraal element voor +',
        input: {
            expr: math.parse('Plus(a,unaryMinus(a))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        },
        functie: function(expr) {
            if (expr.name == 'Plus') {
                if (expr.args.some(s => s.value == 0)) {
                    console.log('good onez');
                    newterms = [];
                    expr.args.forEach(term => {if (term.value != 0) {newterms.push(term)}});
                    newexp = makeMulti('Plus', newterms);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                } 
            } 
        
        }

    },
    eenNeutraalVoorMaal: {
        naam: '1 neutraal element voor *',
        input: {
            expr: math.parse('a/1'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.some(s => s.value == 1)) {
                    console.log('bevat product met 1');
                    newfactors = [];
                    expr.args.forEach(factor => {if (factor.value != 1) {console.log('notone =' + factor.toString()); newfactors.push(factor)}});
                    newexp = makeMulti('Times', newfactors);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                }
            }
        
        }

    },
    schrapUnitaireBreuk: {
        naam: 'schrap unitaire breuk',
        input: {
            expr: math.parse('a/a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1'),
            unknowns: []
        }
    },
    omgekeerdeIsInverseVoorMaal1: {
        naam: 'omgekeerde is inverse voor maal',
        input: {
            expr: math.parse('Times(a,1/a)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1'),
            unknowns: []
        }
    },
    omgekeerdeIsInverseVoorMaal2: {
        naam: 'omgekeerde is inverse voor maal',
        input: {
            expr: math.parse('Times(1/a,a)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1'),
            unknowns: []
        }
    },
    maalbreukOntsplitsen: {
        naam: 'breuken vermenigvuldigen',
        input: {
            expr: math.parse('Times(a/b,c/d)'),
            unknowns: ['a', 'b', 'c', 'd']
        },
        output: {
            expr: math.parse('Times(a,c)/Times(b,d)'),
            unknowns: ['a', 'b', 'c', 'd']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.every(s => s.fn == 'divide')) {
                    console.log('bevat enkel breuken');
                    tellerArgs = [];
                    noemerArgs = [];
                    expr.args.forEach(breuk => {
                        tellerArgs.push(breuk.args[0]);
                        noemerArgs.push(breuk.args[1]);
                    } );
                    teller = makeMulti('Times', tellerArgs);
                    noemer = makeMulti('Times', noemerArgs);
                    newexp = new math.expression.node.OperatorNode("/", "divide", [teller, noemer]);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                }
            }
        
        }

        
    },
    maalbreukSplitsen: {
        naam: 'breuk in factoren uit elkaar trekken (eerste breuk eraf trekken)',
        input: {
            expr: math.parse('Times(a,c)/Times(b,d)'),
            unknowns: ['a', 'b', 'c', 'd']
        },
        output: {
            expr: math.parse('Times(a/b,c/d)'),
            unknowns: ['a', 'b', 'c', 'd']
        },
        functie: function(expr) {
            if (expr.fn == 'divide') {
                if (expr.args.every(s => s.name == 'Times')) {
                    console.log('breuk bestaat uit producten');
                    teller = expr.args[0];
                    noemer = expr.args[1];
                    eersteBreuk = new math.expression.node.OperatorNode("/", "divide", [teller.args[0], noemer.args[0]]);
                    tweedeTeller = makeMulti('Times',teller.args.slice(1,));
                    tweedeNoemer = makeMulti('Times',noemer.args.slice(1));
                    tweedeBreuk = new math.expression.node.OperatorNode("/", "divide", [tweedeTeller, tweedeNoemer]);

                    newexp = makeMulti('Times', [eersteBreuk,tweedeBreuk]);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                }
            }
        
        }
    },
    eenheidsbreukAlsMinEenExponent: {
        naam: 'eenheidsbreuk als negatieve exponent',
        input: {
            expr: math.parse('1/a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('pow(a,unaryMinus(1))'),
            unknowns: ['a']
        }
    },
    minEenExponentAlsEenheidsbreuk: {
        naam: 'negatieve exponent als eenheidsbreuk',
        input: {
            expr: math.parse('pow(a,unaryMinus(1))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1/a'),
            unknowns: ['a']
        }
    },

    eenheidsbreukAlsNegatieveExponent: {
        naam: 'eenheidsbreuk als negatieve exponent',
        input: {
            expr: math.parse('1/pow(a,n)'),
            unknowns: ['a','n']
        },
        output: {
            expr: math.parse('pow(a,unaryMinus(n))'),
            unknowns: ['a','n']
        }
    },

    negatieveExponentAlsEenheidsbreuk: {
        naam: 'negatieve exponent als eenheidsbreuk',
        input: {
            expr: math.parse('pow(a,unaryMinus(n))'),
            unknowns: ['a','n']
        },
        output: {
            expr: math.parse('1/pow(a,n)'),
            unknowns: ['a','n']
        }
    },

    vermenigvuldigingMetEenheidsbreuk: {
        naam: 'vermenigvuldiging met eenheidsbreuk geeft breuk (dyadisch)',
        input: {
            expr: math.parse('Times(a,1/b)'),
            unknowns: ['a', 'b']
        },
        output: {
            expr: math.parse('a/b'),
            unknowns: ['a', 'b']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.some(s => s.fn == 'divide' && s.args[0]==1)) {
                    console.log('product bevat eenheidsbreuk');
                    if (expr.args.length == 2) {
                        expr.args.forEach(factor => factor.fn == 'divide' ? eenheidsBreuk = factor : andereFactor = factor);

                    }

                    newexp = new math.expression.node.OperatorNode("/", "divide", [andereFactor, eenheidsBreuk.args[1]]);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                }
            }
        
        }
    },
    vermenigvuldigingGetalMetEenheidsbreuk: {
        naam: 'vermenigvuldiging getal met eenheidsbreuk geeft breuk',
        input: {
            expr: math.parse('Times(a/b,c)'),
            unknowns: ['a', 'b', 'c']
        },
        output: {
            expr: math.parse('Times(a,c)/b'),
            unknowns: ['a', 'b','c']
        },
        //  TODO oorspronkelijke volgorde van breuk en andere factor respecteren in output
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.some(s => s.fn == 'divide')) {
                    console.log('product bevat breuk');
                    if (expr.args.length == 2) {
                        expr.args.forEach(factor => factor.fn == 'divide' ? breuk = factor : andereFactor = factor);
                        console.log('breuk = ' + breuk.toString());
                        console.log('andere factor = ' + andereFactor.toString());
                        if (andereFactor.type != 'OperatorNode' && andereFactor.fn != 'divide') {
                            console.log('andere Factor is geen operatornode');
                            nieuweTeller = makeMulti('Times', [breuk.args[0] , andereFactor]);
                            newexp = new math.expression.node.OperatorNode("/", "divide", [nieuweTeller, breuk.args[1]]);
                            console.log('newexp =' + newexp.toString());
                            return newexp;
                        }
                    }

            
                }
            }
        
        }
    },
    simpeleBreukUitElkaarTrekken: {
        naam: 'breuk als getal maal eenheidsbreuk',
        input: {
            expr: math.parse('a/b'),
            unknowns: ['a', 'b']
        },
        output: {
            expr: math.parse('Times(a,1/b)'),
            unknowns: ['a', 'b']
        }
    },
    // vermenigvuldigingMetEenLinks: {
    //     naam: '1 is neutraal voor vermenigvuldiging',
    //     input: {
    //         expr: math.parse('Times(1,a)'),
    //         unknowns: ['a']
    //     },
    //     output: {
    //         expr: math.parse('a'),
    //         unknowns: ['a']
    //     }
    // },
    // vermenigvuldigingMetEenRechts: {
    //     naam: '1 is neutraal voor vermenigvuldiging',
    //     input: {
    //         expr: math.parse('Times(a,1)'),
    //         unknowns: ['a']
    //     },
    //     output: {
    //         expr: math.parse('a'),
    //         unknowns: ['a']
    //     }
    // },
    vermenigvuldigingMetNul: {
        naam: '0 is opslorpend voor vermenigvuldiging',
        input: {
            expr: math.parse('Times(0, a)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.some(s => s.value == 0)) {
                    console.log('bevat factor met 0');
                    newexp = new math.expression.node.ConstantNode(0);
                    return newexp;
                }
            }
        }
    },
    // vermenigvuldigingMetNulRechts: {
    //     naam: '0 is neutraal voor vermenigvuldiging',
    //     input: {
    //         expr: math.parse('Times(a,0)'),
    //         unknowns: ['a']
    //     },
    //     output: {
    //         expr: math.parse('a'),
    //         unknowns: ['a']
    //     }
    // },
    wortelInversAanMacht: {
        naam: 'wortel heft een macht op',
        input: {
            expr: math.parse('nthRoot(pow(a,b),b)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        }
    },
    machtInversAanWortel: {
        naam: 'macht heft een wortel op',
        input: {
            expr: math.parse('pow(nthRoot(a,b),b)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        }
    },
    exponentenOptellen: {
        naam: 'product van machten (= zelfde basis) telt exponenten op',
        input: {
            expr: math.parse('Times(pow(x,a),pow(x,b))'),
            unknowns: ['x','a','b']
        },
        output: {
            expr: math.parse('pow(x,Plus(a,b))'),
            unknowns: ['x','a','b']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                baseArray = [];
                exponentArray = [];
                one = math.parse('1');
                expr.args.forEach(factor => {
                    if (factor.name == 'pow') {
                        baseArray.push(factor.args[0]);
                            exponentArray.push(factor.args[1]);
                    } else { 
                        baseArray.push(factor);
                        exponentArray.push(one);
                    }
                });
                base = baseArray[0];
                if (baseArray.every(s => s.equals(base))) {
                    console.log('good one');
                    // console.log(exponentArray);
                    zonderOnes = [];
                    i = 0;
                    exponentArray.forEach(exp => {if (exp.equals(one)) {i++} else {zonderOnes.push(exp)} });
                    // als het allemaal eentjes zijn tellen we ze ineens op (als enige exponent)
                    if (0 == zonderOnes.length) {
                        exponentArray = [math.parse(String(i))];
                    };
                    exponent = makeMulti('Plus', exponentArray);
                    return new math.expression.node.FunctionNode("pow", [base,exponent]);
                }
            }
            
        }
    },
    somVanExponentenNaarVermenigvuldiging: {
        naam: 'opgetelde exponenten schrijven als een vermenigvuldiging',
        input: {
            expr: math.parse('pow(x,Plus(a,b))'),
            unknowns: ['x','a','b']
        },
        output: {
            expr: math.parse('Times(pow(x,a),pow(x,b))'),
            unknowns: ['x','a','b']
        },
        functie: function(expr) {
            if (expr.name == 'pow' && expr.args[1].name == "Plus") {
                console.log('good one');
                base = expr.args[0];
                exponentArray = expr.args[1].args;
                machtArray = exponentArray.map(exponent => new math.expression.node.FunctionNode("pow", [base,exponent]) )
                return makeMulti('Times', machtArray);
            }
        }
    },
    machtTorenAfbreken: {
        naam: 'machttoren afbreken',
        input: {
            expr: math.parse('pow(pow(x,a),b)'),
            unknowns: ['x','a','b']
        },
        output: {
            expr: math.parse('pow(x,Times(a,b))'),
            unknowns: ['x','a','b']
        }
    },
    machtTorenOpbouwen: {
        naam: 'machttoren opbouwen',
        input: {
            expr: math.parse('pow(x,Times(a,b))'),
            unknowns: ['x','a','b']
        },
        output: {
            expr: math.parse('pow(pow(x,a),b)'),
            unknowns: ['x','a','b']
        },
        functie: function(expr) {
            if (expr.name == 'pow' && expr.args[1].name == "Times") {
                console.log('good one');
                base = expr.args[0];
                exponentArray = expr.args[1].args;
                lastExponent = exponentArray.pop();
                restProduct = makeMulti('Times', exponentArray);
                newBase = new math.expression.node.FunctionNode('pow', [base,restProduct]);
                newexpr = new math.expression.node.FunctionNode('pow', [newBase,lastExponent]);
                return newexpr;
            }
        }
    },
    machtNaarWortelNotatie: {
        naam: 'macht als wortel schrijven',
        input: {
            expr: math.parse('pow(x,p/q)'),
            unknowns: ['x','p','q']
        },
        output: {
            expr: math.parse('nthRoot(pow(x,p),q)'),
            unknowns: ['x','p','q']
        }
    },
    wortelNaarMachtNotatie1: {
        naam: 'wortel als macht schrijven',
        input: {
            expr: math.parse('nthRoot(pow(x,p),q)'),
            unknowns: ['x','p','q']
        },
        output: {
            expr: math.parse('pow(x,p/q)'),
            unknowns: ['x','p','q']
        }
    },
    wortelNaarMachtNotatie2: {
        naam: 'wortel als macht schrijven',
        input: {
            expr: math.parse('pow(nthRoot(x,q),p)'),
            unknowns: ['x','p','q']
        },
        output: {
            expr: math.parse('pow(x,p/q)'),
            unknowns: ['x','p','q']
        }
    },
    wortelNaarMachtNotatie3: {
        naam: 'wortel als macht schrijven',
        input: {
            expr: math.parse('nthRoot(x,q)'),
            unknowns: ['x','q']
        },
        output: {
            expr: math.parse('pow(x,1/q)'),
            unknowns: ['x','q']
        }
    },

    machtVanProduct: {
        naam: 'macht van een product',
        input: {
            expr: math.parse('pow(Times(x,y),n)'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('Times(pow(x,n),pow(y,n))'),
            unknowns: ['x','y','n']
        },
        functie: function(expr) {
            if (expr.name == 'pow' && expr.args[0].name == "Times") {
                console.log('good one');
                exponent = expr.args[1];
                baseArray = expr.args[0].args;
                machtArray = baseArray.map(base => new math.expression.node.FunctionNode("pow", [base,exponent]) )
                return makeMulti('Times', machtArray);
            }

        }
    },
        
    productMetGelijkeExponenten: {
        naam: 'product met gelijke exponenten',
        input: {
            expr: math.parse('Times(pow(x,n),pow(y,n))'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('pow(Times(x,y),n)'),
            unknowns: ['x','y','n']
        },
        
        functie: function(expr) {
            if (expr.name == 'Times') {
                
                if (expr.args.every(factor => factor.fn == 'pow')) {
                    console.log('good one');
                    baseArray = [];
                    exponent = expr.args[0].args[1];
                    expr.args.forEach( factor => {if (factor.args[1].equals(exponent)) {baseArray.push(factor.args[0])} });
                    console.log('aantal gelijke exp = ' + baseArray.length);
                    // powArray = baseArray.map( base => new math.expression.node.FunctionNode('pow', [base, exponent]));
                    if (baseArray.length === expr.args.length) {
                        product = makeMulti('Times', baseArray);
                        macht = new math.expression.node.FunctionNode('pow', [product, exponent]);
                        console.log('macht = ' + macht.toString());
                        return macht;
                    }
                }
            }
            
        }


    },
    // optellenMetNulLinksDoetNiks: {
    //     naam: 'optellen met nul langs links',
    //     input: {
    //         expr: math.parse('Plus(0,a)'),
    //         unknowns: ['a']
    //     },
    //     output: {
    //         expr: math.parse('a'),
    //         unknowns: ['a']
    //     }
    // },
    // optellenMetNulRechtsDoetNiks: {
    //     naam: 'optellen met nul langs rechts',
    //     input: {
    //         expr: math.parse('Plus(a,0)'),
    //         unknowns: ['a']
    //     },
    //     output: {
    //         expr: math.parse('a'),
    //         unknowns: ['a']
    //     }
    // },

    productVanGelijkeWortels: {
        naam: 'product van gelijke wortels',
        input: {
            expr: math.parse('Times(nthRoot(x,n),nthRoot(y,n))'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('nthRoot(Times(x,y),n)'),
            unknowns: ['x','y','n']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                
                if (expr.args.every(factor => factor.fn == 'nthRoot')) {
                    console.log('good one');
                    baseArray = [];
                    n = expr.args[0].args[1];
                    expr.args.forEach( factor => {if (factor.args[1].equals(n)) {baseArray.push(factor.args[0])} });
                    console.log('aantal gelijke exp = ' + baseArray.length);
                    
                    if (baseArray.length === expr.args.length) {
                        product = makeMulti('Times', baseArray);
                        wortel = new math.expression.node.FunctionNode("nthRoot", [product, n]);

                    //    parsewortel = math.parse("nthRoot(a,b)");
                    //    parsewortel.args[0] = product;
                    //    parsewortel.args[1] = n;
                        
                        console.log('wortel = ' + wortel.toString());
                        return wortel;

                    // console.log('parsewortel = ' + parsewortel.toString());
                    //    return parsewortel;
                    }
                }
            }
            
        },

                        
        
        
    },
        
    productOnderDeWortel: {
        naam: 'product onder de wortel',
        input: {
            expr: math.parse('nthRoot(Times(x,y),n)'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('Times(nthRoot(x,n),nthRoot(y,n))'),
            unknowns: ['x','y','n']
        },
        functie: function(expr) {
            if (expr.name == 'nthRoot') {
                
                if (expr.args[0].name == 'Times') {
                    console.log('good one');
                    factorArray = expr.args[0].args;
                    n = expr.args[1];
                        wortelArray = factorArray.map(factor => new math.expression.node.FunctionNode("nthRoot", [factor, n]))
                        product = makeMulti('Times', wortelArray);
                        console.log('product = ' + product.toString());
                        return product;
                    
                }
            }
        }
    },
    wortelVanBreuk: {
        naam: 'wortel van een breuk',
        input: {
            expr: math.parse('nthRoot(x/y,n)'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('nthRoot(x,n)/nthRoot(y,n)'),
            unknowns: ['x','y','n']
        }
    },
    breukVanWortels: {
        naam: 'breuk van wortels',
        input: {
            expr: math.parse('nthRoot(x,n)/nthRoot(y,n)'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('nthRoot(x/y,n)'),
            unknowns: ['x','y','n']
        }
    },
        // TODO functie voor schrijven
    binomium2Expand: {
        naam: 'merkwaardig kwadraat uitwerken',
        input: {
            expr: math.parse('pow(Plus(a,b),2)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Plus(pow(a,2),Times(2,a,b), pow(b,2))'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven zodat het niet langere plussen meeherkent!
    binomium2Factor: {
        naam: 'merkwaardig kwadraat herkennen',
        input: {
            expr: math.parse('Plus(pow(a,2),Times(2,a,b), pow(b,2))'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('pow(Plus(a,b),2)'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven
    binomium3Expand: {
        naam: 'merkwaardige derdemacht uitwerken',
        input: {
            expr: math.parse('pow(Plus(a,b),3)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Plus(pow(a,3),Times(3,pow(a,2),b),Times(3,a,pow(b,2)), pow(b,3))'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven
    binomium3Factor: {
        naam: 'merkwaardig derde macht herkennen',
        input: {
            expr: math.parse('Plus(pow(a,3),Times(3,pow(a,2),b),Times(3,a,pow(b,2)), pow(b,3))'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('pow(Plus(a,b),3)'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven
    verschilVanKwadratenExpand: {
        naam: 'verschil van kwadraten uitwerken',
        input: {
            expr: math.parse('Plus(pow(a,2),unaryMinus(pow(b,2)))'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Times(Plus(a,b),Plus(a,unaryMinus(b)))'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven
    verschilVanKwadratenExpand1: {
        naam: 'verschil van kwadraten herkennen',
        input: {
            expr: math.parse('Times(Plus(a,b),Plus(a,unaryMinus(b)))'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Plus(pow(a,2),unaryMinus(pow(b,2)))'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven
    verschilVanKwadratenExpand2: {
        naam: 'verschil van kwadraten herkennen',
        input: {
            expr: math.parse('Times(Plus(a,unaryMinus(b)),Plus(a,b))'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Plus(pow(a,2),unaryMinus(pow(b,2)))'),
            unknowns: ['a','b']
        }
    },
    BreukAlsVerschilVanExponenten: {
        naam: 'breuk van machten is het verschil van exponenten',
        input: {
            expr: math.parse('pow(a,n)/pow(a,m)'),
            unknowns: ['a','n','m']
        },
        output: {
            expr: math.parse('pow(a,n-m)'),
            unknowns: ['a','n','m']
        }
    },

    nulDelenDoorIets: {
        naam: 'nul delen door iets is nul',
        input: {
            expr: math.parse('0/a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        }
    },

    factorBuitenhalen: {
        naam: 'factor buitenhalen',
        input: {
            expr: math.parse('Plus(a,b)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Times(c,Plus(a/c,b/c))'),
            unknowns: ['a','b']
        },
        functie: function(expr) {
            
            if (expr.name == 'Plus') {
                
                    console.log('good one');
                    generatorArray = [];
                    divisor = math.parse('c');
                    newTermsArray = expr.args.map(term => new math.expression.node.OperatorNode("/", "divide", [term, divisor]));
                    newPlus = makeMulti('Plus', newTermsArray);

                    return makeMulti('Times', [divisor, newPlus]);
                
            }
        
        },
        extraEquation: math.parse('c==Select(c)')
    },

    productAlsMacht: {
        naam: 'gelijke factoren als een macht schrijven met functie',
        input: {
            expr: [],
            unknowns: [],

        },
        output: {
            expr: [],
            unknowns: [],
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                base = expr.args[0];
                if (expr.args.every( factor => factor.equals(base))) {
                    console.log('good one');
                    exponent = expr.args.length;
                    console.log('exponent = '+ exponent);
                    console.log('base = ' + base.toString());
                    return new math.expression.node.FunctionNode('pow', [base, math.parse(exponent)]);

                }
            }
            
        }

    },

    brengLinkseFactorBinnenMetFunctie: {
        naam: 'factor langs links binnen multiplus brengen met functie',
        input: {
            expr: [],
            unknowns: [],

        },
        output: {
            expr: [],
            unknowns: [],
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args[1].name == 'Plus') {
                    console.log('good one');
                    generatorArray = expr.args;
                    console.log(generatorArray);
                    combos = oneCombinations(generatorArray);
                    return makeMulti('Plus', combos.map(paar => makeMulti('Times', paar)));

                }
            }
            // return math.parse('Times(l,o,l)');
        }

    },

    expandDoorMetFunctie: {
        naam: 'product van multiplussen terugbrengen tot lange som met functie',
        input: {
            expr: [],
            unknowns: [],

        },
        output: {
            expr: [],
            unknowns: [],
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.some(s => s.name == 'Plus')) {
                    console.log('good one');
                    generatorArray = [];
                    expr.args.forEach(factor => (factor.name == 'Plus') ? generatorArray.push(factor.args) : generatorArray.push(factor));
                    console.log(generatorArray);
            //  TODO: vervang oneCombinations hier door nCombinations!
                    combos = oneCombinations(generatorArray);
                    return makeMulti('Plus', combos.map(paar => makeMulti('Times', paar)));

                }
            }
            return math.parse('Times(l,o,l)');
        }

    },

    vergelijkingNegeren: {
        naam: 'negeer vergelijking',
        input: {
            expr: math.parse('a==b'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('a==b'),
            unknowns: ['a','b']
        },
        functie: function(expr) {
            if (expr.fn == 'equal') {
                return math.parse("vgl dus gn omvorm");
            }

        }
    },                    

    nulBijtellen: {

        naam: 'nul bijtellen',
        input: {

            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {

            expr: math.parse('Plus(a,0)'),
            unknowns: ['a']
        }
    },

    aGedeeldDoorA: {

        naam: 'a delen door a is 1',
        input: {
            expr: math.parse('a/a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1'),
            unknowns: []
        }
    }, 

    logUitdelenOverMaal: {

        naam: 'log uitdelen over product',
        input: {
            expr: math.parse('log(Times(b,c),a)'),
            unknowns: ['a','b','c']
        },
        output: {

            expr: math.parse('Plus(log(b,a),log(c,a))'),
            unknowns: ['a','b','c']
        }
    },

    logUitdelenOverExp: {

        naam: 'log uitdelen over exponent',
        input: {
            expr: math.parse('log(pow(b,c),a)'),
            unknowns: ['a','b','c']
        },
        output: {

            expr: math.parse('Times(c,log(b,a))'),
            unknowns: ['a','b','c']
        }
    },                     


};