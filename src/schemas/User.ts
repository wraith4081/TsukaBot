import mongoose, { Schema } from "mongoose";

const DailyReward = {
    time: {
        type: Number,
        default: 0,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    streak: {
        type: Number,
        default: 0,
        required: true
    },

    money: {
        from: {
            type: Number,
            default: 0,
            required: true
        },
        to: {
            type: Number,
            default: 0,
            required: true
        }
    }
}

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },

    money: {
        type: Number,
        default: 0,
        required: true
    },

    daily: {
        type: [DailyReward],
        default: [],
        required: true
    },
});

export default mongoose.model("User", UserSchema);