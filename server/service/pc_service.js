const { Prisma, PrismaClient } = require("@prisma/client");

const prisma_client = new PrismaClient
class PCService {
	
	 // первым делом нужно достать из запроса нужную нам информацию с данными о пользователе
    // вся информация хранится в body то есть чтоб к ней обратится мы пишем req.body
    async AddPC(req) {
        // с помощью такой конструкции мы сразу ищем в запросе нужные нам поля для юзера и записываем их в переменные

        const { motherboard, processor, videocard, RAM, keyboard, monitor, userId } = req.body;
    
        try {
            // у призмы есть много методов которые вы можете загуглить для создания используется
            // метод create 
            // для работы с бд используем prisma client потом выбираем таблицу с которой
            // будем работать в нашем случаее PC после этого вызываем метод что хоти сделать
            const newPC = await prisma_client.PC.create({
                data: {
                    motherboard,
                    processor,
                    videocard,
                    RAM,
                    keyboard,
                    monitor,
                    userId
                },
            })
            //если все успешно возвращаем пользователя обратно в контроллер
            return newPC
        } catch (e) {
            console.log(e)
            return res.json({e})
        }
    }
	
    async GetAllPCs()
    {
        return prisma_client.PC.findMany({});
    }

    async UpdatePC(req)
    {
        const { id, key, val } = req.body;
        if (!key)
            return { "error": "KEY NOT PRESENT" }

        if (key == "id")
            return { "error": "You cannot change id" }

        var usr = await prisma_client.PC.update({"where": {"id": id}, "data": {[key]: val}})
        return usr
    }

    async DeletePC(req)
    {
        const { id } = req.body;
        
        await prisma_client.PC.deleteMany({"where" : { "id": id}})
        return { "error" : "SUCCESS" }
    }
}

module.exports = new PCService;