export class Auth {
    users = [
        {
            firstName: "Forest",
            lastName: "Marie",
            username: "fmarie"
        },
        {
            firstName: "Julie",
            lastName: "Marie",
            username: "jmarie"
        },
        {
            firstName: "Elijah",
            lastName: "Marie",
            username: "emarie"
        },
        {
            firstName: "Link",
            lastName: "Marie",
            username: "lmarie"
        }
    ];

    _getUser() {
        return this.users[Math.floor(Math.random() * this.users.length)];
    }

    get fullName() {
        const user = this._getUser();
        return `${user.firstName} ${user.lastName}`;
    }
}

const auth = new Auth();
export default auth;
