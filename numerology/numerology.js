/* UITLITY FUNCTIONS */
class NumerologyNumbersCalculator{
	constructor(fullName, birthDate){
		this.fullName = this.sanitizeName(fullName);
		this.birthDate = birthDate;
	}
	
	numericalLettersMap(letter){
		return (letter.toLowerCase().charCodeAt(0)-96) % 9 ? (letter.toLowerCase().charCodeAt(0)-96) % 9 : 9;
	}

	digitSum(n){
		if(n == 11|| n == 22 || n == 33) return n //magic numbers
		if(n/10 < 1) return n%10;
		return n%10 + this.digitSum(Math.floor(n/10));
	}

	digitSumNoMasters(n){
		return (n/10 < 1) ? n%10 : n%10 + this.digitSumNoMasters(Math.floor(n/10)); //one line to sum digits
	}

	singleDigitReduce(n){
		while(n > 9){
			let sum = 0;
			sum = this.digitSum(n);
			n = sum;
		}
		return n;
	}

	sanitizeName(fullName){
		return fullName.toLowerCase().split("").filter(l => l.match(/[a-z]/));
	}

	justVowels(){
		return this.fullName.filter(l => l.match(/[a|e|i|o|u]/));;
	}

	justConsonants(){
		return this.fullName.filter(l => !l.match(/[a|e|i|o|u]/));
	}

	/* NUMEROLOGY FUNCTIONS */

	getLifePathNumber(birthDate){
		return this.singleDigitReduce(this.birthDate.split('/').reduce((acc,cur) => acc += this.singleDigitReduce(Number(cur)), 0));
	}

	getExpressionNumber(fullName){
		return this.singleDigitReduce(this.fullName.reduce((acc,cur) => acc += this.numericalLettersMap(cur), 0));
	}
	 
	getHeartsDesireNumber(fullName){
		return this.singleDigitReduce(this.justVowels().reduce((acc,cur) => acc += this.numericalLettersMap(cur), 0));
	}

	getPersonalityNumber(fullName){
		return this.singleDigitReduce(this.justConsonants().reduce((acc,cur) => acc += this.numericalLettersMap(cur), 0));
	}

	getCornerstoneNumber(fullName){
		return this.singleDigitReduce(this.numericalLettersMap(this.fullName[0]));
	}

	getCapstoneNumber(fullName){
		return this.singleDigitReduce(this.numericalLettersMap(this.fullName[this.fullName.length - 1]));
	}

	getFirstVowelNumber(fullName){
		return this.singleDigitReduce(this.numericalLettersMap(this.justVowels()[0]));
	}

	//this is the one with max digits, i need to learn name
	//getExpressionNumber(fullName){
	//	return this.fullName.reduce((acc,cur) => {acc[this.numericalLettersMap(cur)] = ((acc[this.numericalLettersMap(cur)] + 1) || 0); return acc}, {});
	//}
}

$(document).ready(() => {
	$("#submit").click(() => {
		var fullName = $('#fullName').val(), birthDate = $('#birthDate').val();
        if(fullName || birthDate){
        	let numbers = new NumerologyNumbersCalculator(fullName, birthDate);
        	if(birthDate) $('#lifePath').attr('number', numbers.getLifePathNumber());
        	if(fullName){       		
        		$('#expression').attr('number', numbers.getExpressionNumber());
        		$('#heartsDesire').attr('number', numbers.getHeartsDesireNumber());
        		$('#cornerstone').attr('number', numbers.getCornerstoneNumber());
        		$('#personality').attr('number', numbers.getPersonalityNumber());
        		$('#capstone').attr('number', numbers.getCapstoneNumber());
        		$('#firstVowel').attr('number', numbers.getFirstVowelNumber());
        	}
        	// $(window).scrollTop($('#numberResultWrapper').offset().top)
        }
	})
})
 