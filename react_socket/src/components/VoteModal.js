

const VoteModal = ({ voteResult }) => {
    const result = []

    for (const ele in voteResult) {
        result.push({ vote: ele, value: voteResult[ele] })
    }

    return (
        <div>
            <p>결과</p>
            <div>
                {
                    result.map(el => {
                        return (
                            <div>
                                <p></p>
                                <div>값:{el.vote}   결과: {el.value}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default VoteModal;