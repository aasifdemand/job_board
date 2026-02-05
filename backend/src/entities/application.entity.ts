import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Job } from './job.entity';

export enum ApplicationStatus {
    APPLIED = 'applied',
    SHORTLISTED = 'shortlisted',
    REJECTED = 'rejected',
    HIRED = 'hired',
    WITHDRAWN = 'withdrawn'
}

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.applications)
    user: User;

    @ManyToOne(() => Job, (job) => job.applications)
    job: Job;

    @Column({
        type: 'enum',
        enum: ApplicationStatus,
        default: ApplicationStatus.APPLIED,
    })
    status: ApplicationStatus;

    @Column({ nullable: true })
    resumeUrl: string;

    @CreateDateColumn()
    appliedAt: Date;
}
