#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class ContactManagementSystem {
    constructor() {
        this.contacts = [];
    }
    async Menu() {
        const { answer } = await inquirer.prompt([
            {
                name: "answer",
                type: "list",
                message: "What do you want to do ?",
                choices: ["Add Contact", "Show Contact List", "Delete Contact", "Exit"]
            }
        ]);
        switch (answer) {
            case "Add Contact":
                await this.addcontact();
                break;
            case "Show Contact List":
                await this.showContactList();
                break;
            case "Delete Contact":
                await this.deleteContact();
                break;
            case "Exit":
                console.log('xxxxxxxxxxxxxxxxxxx==================xxxxxxxxxxxxxxxxxxxx');
                console.log(chalk.yellow('-------------Exiting Contact Management System------------'));
                console.log('xxxxxxxxxxxxxxxxxxx==================xxxxxxxxxxxxxxxxxxxx');
                return;
        }
        await this.Menu();
    }
    async addcontact() {
        const { name, mobile } = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter Full Name :",
                validate: function (value) {
                    if (value.trim() !== "") {
                        return true;
                    }
                    return `Dont leave the Input Empty !!`;
                }
            },
            {
                name: "mobile",
                type: "number",
                message: "Enter Contact Number :"
            },
        ]);
        this.contacts.push({ name, mobile });
        console.log(chalk.green.italic('Contact added successfully!'));
    }
    async deleteContact() {
        if (this.contacts.length === 0) {
            console.log('No Contacts Found');
            return;
        }
        const { index } = await inquirer.prompt([
            {
                name: "index",
                type: "list",
                message: "Select Contact you want to delete",
                choices: this.contacts.map((contact, index) => `${index + 1} ${contact.name} ${contact.mobile}`)
            }
        ]);
        this.contacts.splice(parseInt(index) - 1, 1);
        console.log(chalk.red.italic('Contact deleted successfully!'));
    }
    showContactList() {
        if (this.contacts.length === 0) {
            console.log(chalk.red.italic('No contacts in the list.'));
        }
        else {
            console.log(chalk.bold.cyanBright('Contact List:'));
            this.contacts.forEach((contact, index) => {
                console.log(chalk.blue.bold(`${index + 1}. Name: ${contact.name}, Phone: ${contact.mobile}`));
            });
        }
    }
}
const contactmanagementsystem = new ContactManagementSystem();
contactmanagementsystem.Menu();
