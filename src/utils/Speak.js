export const speak = async response => {
  try {
    await speech.speak({
      text: response,
      queue: false,
      listeners: {
        onstart: () => {
          console.log("started");
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};