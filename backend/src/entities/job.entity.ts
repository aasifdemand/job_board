import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { User } from './user.entity';
import { Application } from './application.entity';

export enum JobType {
    FULL_TIME = 'full_time',
    PART_TIME = 'part_time',
    CONTRACT = 'contract',
    INTERN = 'intern',
}

@Entity('jobs')
export class Job {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    location: string;

    @Column({
        type: 'enum',
        enum: JobType,
    })
    type: JobType;

    @Column({ nullable: true })
    salaryRange: string;

    @Column({ type: 'timestamp', nullable: true })
    deadline: Date;

    @ManyToOne(() => Company, (company) => company.jobs, { eager: true })
    company: Company;

    @ManyToOne(() => User, (user) => user.jobs)
    postedBy: User;

    @OneToMany(() => Application, (app) => app.job)
    applications: Application[];

    @CreateDateColumn()
    createdAt: Date;
}
