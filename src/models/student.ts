import * as mongoose from 'mongoose';
import { teacherModel } from './teacher';

const { Schema, model } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        default: 'Ivan',
    },

    email: {
        type: String,
        trim: true,
        unique: true,
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: teacherModel,
        default: null,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

studentSchema.virtual('fullName').get(function () {
    // @ts-ignore
    return `${this.name} Zelenskiy`;
});

// studentSchema.pre('findOne', function () {
//     this.populate('teacher');
// });

export const studentModel = model('student', studentSchema);
