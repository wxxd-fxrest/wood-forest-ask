
export const MessageIDlist = () => {
    return function (dispatch) {
        let list = [] ; 
        const listID = dbService.collection('Chats').doc(uid).collection('messages')
            listID.result.forEach((doc)=>{
                console.log(doc.id, "=>", doc.data())
                list.push({id: doc.id, ...doc.data()}) ; 
            })
        console.log(list)
        dispatch(MessageID(list));
    }
} ; 
