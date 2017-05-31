CREATE TABLE PatientInfo(
	ID       	varchar(40) PRIMARY KEY,
	MRN         integer NOT NULL,
	Name        varchar(40),
	DOB   		date,
	age         integer NOT NULL,
	menopause   integer NOT NULL,
	hormone     integer NOT NULL,
	size        integer NOT NULL,
	grade       integer NOT NULL,
	nodes       integer NOT NULL
);

CREATE TABLE PatientExpression(
	ID       	varchar(40) PRIMARY KEY,
	mutation    integer NOT NULL,
	Sub1        double precision NOT NULL,
	Oxr1  		double precision NOT NULL,
	Sod1        double precision NOT NULL
);
