const express = require('express');
const app = express();
const window = require('window')
const cors = require('cors');
app.use(express.json());
const PORT = 8080;

app.use(cors());

app.post('/', async (req, res) => {
	console.log(req.body.data)

    const funcNm = req.body.data
    
 	const execFunc = (new Function("return " + funcNm))(); 

    const Qarray = [["3141592" , "271"] , ["500220839878" , "7"] , ["10203" , "15"]];
    const Aarray = [2,8,3];
    let resultArray = []
    
    for(let i=0; i<Qarray.length; i++){
        let result;
        try{
            result = await execFunc(Qarray[i][0], Qarray[i][1])
            if(result === Aarray[i]){
                resultArray.push({'desc' : `${i+1}번째 정답을 맞췄습니다.` , 'state' : 1})
            }
            else{
                resultArray.push({'desc': `${i+1}번째 테스트에서 출력값이 ${Aarray[i]}과다릅니다.` , 'state' : 0})
            }
        }
        catch(err){
            resultArray.push({'desc': err.toString() , 'state' : 0})
        }

    }
    console.log(resultArray)
    return res
            .status(200)
            .json({"result": resultArray})

});

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
