
const input = {
    text:"",
    sort: function(){
        this.text = String(this.text).toLowerCase();
        return this
    },
    answer:"",
}

export const proceesor = (raw)=>{
    // console.log(raw);
    input.text = raw;
}

export const handler = () =>{
    return sensor()
}

const sensor=()=>{
    const statement = input.sort().text;
    console.log(statement);
    var ans =""
    
    if(
        (statement.includes('what') && 
        statement.includes('is your') && 
        statement.includes('name')) ||
        statement.includes("what's your name")
        ){
        ans= "my name is kajool"
    }

    else if(
        (statement.includes('what is') && 
        statement.includes('capital city')) || 
        statement.includes('capital city')){
        ans = "The capital city of ";
        if(statement.includes('nepal')){
            
            ans += "nepal is kathmandu";
        }
        if(statement.includes("usa")){
            ans += "USA is Washington D.C";
        }
        if(statement.includes("spain")){
            ans += "spain is madrid";
        }
        if(statement.includes("japan")){
            ans += "japan is tokyo";
        }
        if(statement.includes("germany")){
            ans += "germany is berlin";
        }
    }
    else if(statement.includes("how to") || statement.includes("how do you")){
        if(statement.includes("make coffee")){
            ans+="Have Moood. \nGet Coffee Powder. \nYou are smart enough to make it."
        }
        if(statement.includes("pass exam")){
            ans+="Go and study you poor.";
        }
        if(statement.includes("get a girlfirend")){
            ans+="Just wake up";
            
        }
    }
    else{
        ans = "I don't know";
    }
    input.answer= ans;
   
}


export const sendResponse = () => {
    return input.answer;
}
