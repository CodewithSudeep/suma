const input = {
  text: "",
  sort: function () {
    this.text = String(this.text).toLowerCase();
    return this;
  },
  answer: "",
};


export const proceesor = (raw) => {
  // console.log(raw);
  input.text = raw;
};

export const handler = async() => {
  await sensor();
  return input.answer;
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
  } else if (statement.includes("what is")){

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
    var subject = statement.replace("what is", "");
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
        // console.log(data.extract);
        ans = data.extract;
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

    if (statement.includes("get a girlfriend")) ans += "Just wake up";
  }
  else if (statement.includes("how are you")) {
    ans += "I am fine, thank you.";
  }
  else if (statement.includes("who am i") || statement.includes("do you know who i am") || statement.includes("do you know me")) {
    ans += "You are a human being.";
  }
  else {
    ans = "I don't know";
  }
}
  input.answer = ans;
  
};




