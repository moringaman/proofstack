


const CardList = (user) => {

  

    const renderCards = () => {
        return (
            <div className="container flex flex-row w-full m-5 justify-center">
                <div className="flex-1 m-5">
                    <div className="bg-gray-10 rounded-xl p-6 border">
                        New Licences
                    </div>
                </div>
                <div className="flex-1 m-5">
                    <div className="bg-gray-10 rounded-xl p-6 border">
                        Active Licences
                    </div>
                </div>
                <div className="flex-1 m-5">
                    <div className="bg-gray-10 rounded-xl p-6 border">
                        Licence Cancellation
                    </div>
                </div>
                <div className="flex-1 m-5">
                    <div className="bg-gray-10 rounded-xl p-6 border">
                        Expiring Licences
                    </div>
                </div>
                    
                
            </div>

        )
    }


    return (
        renderCards()
    )
}

export default CardList