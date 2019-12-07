export const getBoards = (token: string, key: any) => {
    const boards = fetch(`https://trello.com/1/members/me/boards?token=${token}&key=${key}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                return result;
            }
        );
    return boards;
}