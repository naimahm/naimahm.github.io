$(document).ready(function(){
	
	//cat related words
	var word_bank = ['meow', 'mrr', 'mrrw', 'catnip', 'claws', 'kitty', 'kitten', 'cats', 'ket', 'kat', 'cat', 'lolcat', 'whiskers', "alleycat", 'catnap', 'paw', 'copycat', 'feline', 'calico','cheetah', 'leopard', 'bobcat', 'wildcat', 'cougar', 'lion', 'tiger'];

    var paragraphs = $("#paragraphs").val();
    
    $("#paragraphs").change(function(){
        paragraphs = $(this).val();
    })
    
    $("#submit").click(function(){
        $("#output").html(paragraph_builder(word_bank, paragraphs));
    })
	
	
})

function randominized(items){ // accepts an array of words
	var i = items.length;
	
	while(i > 1){
		i = i - 1;
		j = Math.floor((Math.random() * i)); //  0 <= random < i
		t1 = items[i];
		t2 = items[j];
		items[i] = t2;
		items[j] = t1;
	}	

	return items; //returns array of word shuffled
}

function paragraph_builder(words, num_of_paragrahs){
    var output = '<p>';
    
    for(i = 1; i < (4 * num_of_paragrahs); i++){        
        var shuffled = randominized(words);  
        
        output += sentence_builder(shuffled) + ' ';
        
        if((i % 4) == 0){
            output += '</p><p>';
        }
        
    }
    
    output += '</p>';
    
    return output;
}

function sentence_builder(words){
    var sentence = '', num_words = Math.floor((Math.random() * 3) + 7);
    
    //words.splice(num_words);
    
    sentence = words.slice(Math.floor((Math.random() * 3) + 7)).join(' ');
    sentence = sentence[0].toUpperCase() + sentence.slice(1) + '.';
    
    return sentence;
}