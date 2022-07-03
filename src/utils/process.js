const input = {
  text: "",
  sort: function () {
    this.text = String(this.text).toLowerCase();
    return this;
  },
  answer: "",
};
 var subject = "";
export const proceesor = (raw) => {
  // console.log(raw);
  input.text = raw;
};

export const handler = async() => {
  await sensor();
  return input.answer !== "" ? input.answer : "Searching on web";
};

const sensor = async () => {
  const statement = input.sort().text;
  console.log(statement);
  var ans = "";
  if(input.text === ""){

  }else{
  if (statement.includes("hello")) {
    ans = "hello, how are you?";
  }
  else if (
    (statement.includes("what") &&
      statement.includes("is your") &&
      statement.includes("name")) ||
    statement.includes("what's your name") || statement.includes("who are you")
  ) {
    ans = "Hi, My name is Suma, your personal voice assistant!";
  } else if (statement.includes("what") || statement.includes("do you know about") || statement.includes("you know about") || statement.includes("tell me") || statement.includes("who is")){
    if(statement.includes("capital city")) {
    ans = "The capital city of ";
    if (statement.includes("nepal")) ans += "Nepal is Kathmandu";
    if (statement.includes("usa")) ans += "USA is Washington DC";
    if (statement.includes("spain")) ans += "Spain is Madrid";
    if (statement.includes("japan")) ans += "Japan is Tokyo";
    if (statement.includes("germany")) ans += "Germany is Berlin";
    if (statement.includes("france")) ans += "France is Paris";
    if (statement.includes("china")) ans += "China is Beijing";
    if (statement.includes("india")) ans += "India is New Delhi";
    if (statement.includes("russia")) ans += "Russia is Moscow";
    if (statement.includes("italy")) ans += "Italy is Rome";
  }else{
    // remove "what is"
    subject = statement.replace("what is", "");
    if(subject.includes("the")) subject = subject.replace("the", "");
    // if(subject.includes("a")) subject = subject.replace("a", "");
    if(subject.includes("an")) subject = subject.replace("an", "");
    // if(subject.includes("of")) subject = subject.replace("of", "");
    if(subject.includes("who is")) subject = subject.replace("who is", "");
    if(subject.includes("tell me")) subject = subject.replace("tell me", "");
    if(subject.includes("about")) subject = subject.replace("about", "");
    if(subject.includes("you know")) subject = subject.replace("you know", "");
    if(subject.includes("do you")) subject = subject.replace("do you", "");
    // remove space and add underscore for the subject
    subject = subject.replace(/\s/g, "_").toLowerCase();
    // call wikipedia api
    await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${subject}?redirect=false`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.extract){

          ans = "According to wikipedia, \n"+data.extract;
        }
      }).catch((error) => {
        console.log(error);
      }
    );
  }
 

} else if (statement.includes("how to") || statement.includes("how do you")) {
  if (statement.includes("make coffee") || statement.includes("make a coffee") || statement.includes("make a cup of coffee")|| statement.includes("make a cup of coffee"))
      ans +=
        "Have Mood. \nGet Coffee Powder. \nYou are smart enough to make it.";

    if (statement.includes("pass") && statement.includes("exam")) ans += "Go and study, you poor.";

    if (statement.includes("get a girlfriend")) ans += "Are you serious? You are";

    if (statement.includes("cure")){
        ans = "Some of the Preventive medications are : \n"
        if(statement.includes("migraine")){
            ans +="Blood pressure-lowering medications, Antidepressants, Antihistamines, Pain reliever medications, Anti-seizure drugs,  CGRP monoclonal antibodies";
        }
    }
  }
  else if (statement.includes("how are you")) {
    ans += "I am fine, thank you.";
  }
  else if (statement.includes("who am i") || statement.includes("do you know who i am") || statement.includes("do you know me")) {
    ans += "You are a human being.";
  }
  else if(statement.includes("aur kya hal khabar") || statement.includes("kya hal khabar")){
    ans += "Sab badhiya hai";
  }
  else if(statement.includes("tera naam") || statement.includes("tumhara naam")){
    ans += "Namaste, Mera naam Suma hai";
  }
  else if(statement.includes("how old are you") || statement.includes("how old r u")){
    ans += "I am a computer, I am not old.";
  }
  else if(statement.includes("who created you") || statement.includes("who created you")){
    ans += "I was created by CWS and TBS";
  }
  else if(statement.includes("who is your creator") || statement.includes("who is your creator")){
    ans += "CWS and TBS are the creators of me";
  }
  else if(statement.includes("timro naam k ho") || statement.includes("timro naam k ho")){
    ans += "namaste, mero naam suma ho";
  }
  else {
    ans = "Sorry, I don't understand.";
  }
}
  input.answer = ans;
  
};




