export function getTotalIncome(movements) {
    let totalBalance = 0
    movements ?
    movements.map((movement) =>{
        if(!movement.isExpense){
            totalBalance += movement.amount
        }
    })

    :

    totalBalance = 0


    return totalBalance
}

export function getTotalExpense(movements){
    let totalBalance = 0
    movements ?
    movements.map((movement) =>{
        if(movement.isExpense){
            totalBalance += movement.amount
        }
    })

    :

    totalBalance = 0


    return totalBalance
}