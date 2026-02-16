import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Job } from './job.entity';
import { Application } from './application.entity';
import { JobSeekerProfile } from './seeker.entity';
import { Company } from './company.entity';

export enum UserRole {
    JOB_SEEKER = 'job_seeker',
    RECRUITER = 'recruiter',
    ADMIN = 'admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column({ type: 'varchar', length: 255, nullable: true })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        nullable: true,
    })
    role: UserRole | null;


    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ nullable: true })
    resetToken?: string;

    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpiresAt?: Date;

    @Column({ nullable: true })
    verificationToken?: string;

    @Column({ nullable: true })
    emailVerificationOtp?: string;

    @Column({ type: "timestamp", nullable: true })
    emailVerificationOtpExpiresAt?: Date;

    @Column({ default: false })
    isOnboarded: boolean;




    @Column({ nullable: true, unique: true })
    googleId?: string;


    @OneToMany(() => Job, (job) => job.postedBy)
    jobs: Job[];

    @OneToMany(() => Application, (app) => app.user)
    applications: Application[];

    @OneToOne(() => JobSeekerProfile, (profile) => profile.user)
    seekerProfile: JobSeekerProfile;

    @OneToOne(() => Company, (company) => company.user)
    company: Company;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
