const fs = require('fs');
const superagent = require('superagent');
const { fileURLToPath } = require('url');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write to file');
      resolve('success');
    });
  });
};

// Without async await
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('random image saved to file');
  })
  .catch((err) => {
    if (err) return console.log(err.message);
  });
*/

/*
with asyc-await
*/
/* getDigPic reads the dog.txt file asynchronously, saves the dog breed in a data variable.
   The API is then queried asynchronously and the response stored in the res variable.
   The return data(dog image link) is then written in the dog-img.txt file.
*/
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random image saved to file');
  } catch (err) {
    console.log(err);
  }
};

getDogPic();
