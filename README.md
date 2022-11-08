1 - npm install
2 - export $(cat .env | sed 's/#.*//g' | xargs)
3 - nodemon index.js

Routes:

peticao:

  get all peticao
  {api_url}/peticao

  get specific peticao
  {api_url}/peticao/<peticaoID>

  new peticao
  {api_url}/peticao/newpeticao

  update peticao
  {api_url}/peticao/updatpeticao

  sign peticao
  {api_url}/peticao/sign/:peticaoId

  delete peticao
  {api_url}/peticao/delete/:peticaoId

auth:

  register
    {api_url}/auth/register
  
  auth user
    {api_url}/auth/authenticate
    
    
    
user model:

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

peticao model:

const Peticao = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  signed: [
    {
        type: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
});
