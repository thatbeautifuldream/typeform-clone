# Typeform Clone

![Screen Recording 2024-05-06 at 11 46 15 AM](https://github.com/thatbeautifuldream/typeform-clone/assets/28717686/6688ef76-c1e2-46b7-84e9-77a74119ce18)

This is a clone of Typeform. This project was built using `Next.js`, `Reack Hook Form`, `Zod`, `ShadCN UI`.

## Installation

Preffered package manager is `pnpm`. To install the dependencies, run the following command:

```bash
pnpm install
```

## Running the application in development mode

The development server can be started by running the following command:

```bash
pnpm dev
```

By default, the application will be running on port `3000`.

## Building the application

```bash
pnpm build
```

## Containerization

The application can be containerized using `Docker`. To build the image, run the following command:

```bash
docker build -t typeform-clone .
```

- This repository also contains a compose file to run the application in a container by running the following command:

```bash
docker-compose up -d
```

- Flag `-d` is used to run the container in the background.
