const { Prisma, PrismaClient } = require("@prisma/client");

const prisma_client = new PrismaClient
class UserService {
	
	 // первым делом нужно достать из запроса нужную нам информацию с данными о пользователе
    // вся информация хранится в body то есть чтоб к ней обратится мы пишем req.body
    async AddUser(req) {
        // с помощью такой конструкции мы сразу ищем в запросе нужные нам поля для юзера и записываем их в переменные

        const { firstName, lastName, email, numberPhone, position, jobPlace } = req.body;
    
        try {
            var bHasEmail = await prisma_client.user.count(
                { "where": { "email": email } },
                
            ) > 0 ? true : false
            
            var bHasPhone= await prisma_client.user.count(
                { "where": { "numberPhone": numberPhone } },
                
            ) > 0 ? true : false
            if (bHasPhone) return { "ERROR" : "PHONE EXISTS" }
            if (bHasEmail) return { "ERROR" : "EMAIL EXISTS" }
            // у призмы есть много методов которые вы можете загуглить для создания используется
            // метод create 
            // для работы с бд используем prisma client потом выбираем таблицу с которой
            // будем работать в нашем случаее user после этого вызываем метод что хоти сделать
            const newUser = await prisma_client.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    numberPhone,
                    position,
                    jobPlace,
                    aboutPC: {}
                },
            })
            //если все успешно возвращаем пользователя обратно в контроллер
            return newUser
        } catch (e) {
            console.log(e)
            return res.json({e})
        }
    }
	
    async GetAllUsers()
    {
        return prisma_client.user.findMany({});
    }

    async UpdateUser(req)
    {
        const { id, key, val } = req.body;
        if (!key)
            return { "error": "KEY NOT PRESENT" }

        if (key == "id")
            return { "error": "You cannot change id" }

        if (key == "email" || key == "numberPhone")
        {
            var bHas = await prisma_client.user.count({"where": {"id": id}, "data": {[key]: val}}) 
                > 0 ? true : false
            if (bHas)
            {
                return {"error" : "ERROR - DUPLICATE"}
            }
        }

        var usr = await prisma_client.user.update({"where": {"id": id}, "data": {[key]: val}})
        return usr
    }

    async DeleteUser(req)
    {
        const { id } = req.body;
        
        await prisma_client.user.deleteMany({"where" : { "id": id}})
        return { "error" : "SUCCESS" }
    }
}

module.exports = new UserService;