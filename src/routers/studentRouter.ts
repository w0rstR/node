import {
    Router,
} from 'express';
import { studentModel } from '../models/student';

export const studentRouter = Router();

studentRouter.post('', async (req, res, next) => {
    try {
        const createdStudent = await studentModel.create(req.body);
        res.json(createdStudent);
    } catch (e) {
        next(e);
    }
});

studentRouter.get('', async (req, res, next) => {
    try {
        // const students = await studentModel.findOne({});
        // const students = await studentModel.find({});
        const students = await studentModel.find({}).populate('teacher');

        // const teachers = await teacherModel.create({
        //     name: 'Maks',
        //     email: 'maks@mail.ru',
        // });
        // console.log(teachers);
        res.json(students);
    } catch (e) {
        next(e);
    }
});

studentRouter.patch('/:student_id', async (req, res, next) => {
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(
            req.params.student_id,
            { teacher: '625855b459989f170f8b63d0' },
            { new: true },
        );
        res.json(updatedStudent);
    } catch (e) {
        next(e);
    }
});
