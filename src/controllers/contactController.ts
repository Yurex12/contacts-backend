import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Contact from '../models/contactModel';

//@desc Get all contacts
//@route GET api/contact
//@access private

const getContacts = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const contacts = await Contact.find({ userId: req.user.id });
    res.status(200).json({
      data: contacts,
      length: contacts.length,
      messsage: 'Successful',
    });
  }
);

//@desc create contact
//@route POST api/contact
//@access private

const createContact = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, phone, name } = req.body as ContactRequestBody;

    // validate contact data
    // if (!email || !phone || !name) {
    //   res.status(404);
    //   throw new Error('All fields are required.');
    // }

    // check if email exist
    if (await Contact.findOne({ email })) {
      res.status(403);
      throw new Error('Email has already been used.');
    }

    const contact = await Contact.create({
      email,
      name,
      phone,
      userId: req.user.id,
    });
    res
      .status(201)
      .json({ message: 'Contact created succesfully ', data: contact });
  }
);

//@desc get contact
//@route GET api/contact/:id
//@access private

const getContact = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: contactId } = req.params as ContactRequestParams;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      res.status(404);
      throw new Error(`Contact with the Id: ${contactId} was not found`);
    }

    res.status(200).json({ data: contact });
  }
);

//@desc update contact
//@route PUT api/contact/:id
//@access private
const updateContact = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: contactId } = req.params as ContactRequestParams;
    const { email, phone, name } = req.body as ContactRequestBody;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      res.status(404);
      throw new Error(`Contact with the Id: ${contactId} was not found.`);
    }

    if (req.user.id !== contact.userId.toString()) {
      res.status(403);
      throw new Error(`Not authorized`);
    }

    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    const result = await contact.save();
    res
      .status(200)
      .json({ messsage: `Contact ${contactId} updated`, data: result });
  }
);

//@desc delete contact
//@route DELETE api/contact/:id
//@access private

const deleteContact = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: contactId } = req.params as ContactRequestParams;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      res.status(404);
      throw new Error(`Contact with the Id: ${contactId} was not found.`);
    }

    if (req.user.id !== contact.userId.toString()) {
      res.status(403);
      throw new Error(`Not authorized`);
    }

    await Contact.deleteOne({ _id: contactId });
    res.status(200).json({ messsage: `Contact ${contactId} deleteted` });
  }
);

export { getContacts, getContact, createContact, updateContact, deleteContact };
