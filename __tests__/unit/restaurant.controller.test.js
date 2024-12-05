const restaurantModel = require('../../models/restaurant.model');
const httpMocks = require('node-mocks-http');
const newRestaurant = require('../mock-data/new-restaurant.json');
const restaurantController = require('../../controllers/restaurant.controller');
const allRestaurants = require("../mock-data/all-restaurant.json")

restaurantModel.prototype.save = jest.fn();
restaurantModel.create = jest.fn();
restaurantModel.find = jest.fn();
restaurantModel.findById = jest.fn();
restaurantModel.findByIdAndUpdate = jest.fn();
restaurantModel.findByIdAndDelete = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('RestaurantController.createRestaurant', () => {
    beforeEach(() => {
        req.body = newRestaurant;
    });

    it('should have a createRestaurant function', () => {
        expect(typeof restaurantController.createRestaurant).toBe('function');
    });

    it('should call restaurantModel.save', async () => {
        await restaurantController.createRestaurant(req, res, next);
        expect(restaurantModel.prototype.save).toHaveBeenCalled();
    });

    it('should return 201 response code', async () => {
        restaurantModel.prototype.save.mockReturnValue(newRestaurant);
        await restaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        restaurantModel.prototype.save.mockReturnValue(newRestaurant);
        await restaurantController.createRestaurant(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error saving restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        restaurantModel.prototype.save.mockReturnValue(rejectedPromise);
        await restaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual({ message: 'Error saving restaurant' });
    });
});

describe('restaurantController.getRestaurant', () => {
    it("should have a getRestaurant function", () => {
        expect(typeof restaurantController.getRestaurant).toBe("function");
    });

    it("should call restaurantModel.find({})", async () => {
        await restaurantController.getRestaurant(res, req, next);
        expect(restaurantModel.find).toHaveBeenCalledWith({});
    });

    it("should return response with status 200 and all restaurants", async () => {
        restaurantModel.find.mockReturnValue(allRestaurants);
        await restaurantController.getRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allRestaurants);
    })

    // it("should handle errors in getRestaurants", async () => {
    //     const errorMessage = {message: "Error finding"};
    //     const rejectedPromise = Promise.reject(errorMessage);
    //     restaurantModel.find.mockReturnValue(rejectedPromise),
    //     await restaurantController.getRestaurant(req, res, next);
    //     expect(next).toBeCalledWith(errorMessage);
    // })
});

describe('restaurantController.getRestaurantById', () => {
    it("should have a getRestaurantById function", () => {
        expect(typeof restaurantController.getRestaurantById).toBe("function");
    });

    it("should call restaurantModel.findById", async () => {
        await restaurantController.getRestaurantById(res, req, next);
        expect(restaurantModel.findById).toHaveBeenCalled;
    });
    // it("should call restaurantModel.findById with route parameters", async () => {
    //     req.params.id = "66ffb1f3e5e0f4b4efbddd59";
    //     await restaurantController.getRestaurantById(res, req, next);
    //     expect(restaurantModel.findById).toBeCalledWith("66ffb1f3e5e0f4b4efbddd59");
    // });
});

describe('restaurantController.updateRestaurant', () => {
    it("should have an updateRestaurant function", () => {
        expect(typeof restaurantController.updateRestaurant).toBe("function");
    });
    it("should call restaurantModel.findByIdAndUpdate", async () => {
        await restaurantController.getRestaurant(res, req, next);
        expect(restaurantModel.findByIdAndUpdate).toHaveBeenCalled;
    });

    // it("should find and update by id", async () => {
    //     req.params.id = restaurantId;
    //     req.body = newRestaurant;
    //     await restaurantController.updateToDo(req, res, next);
    //     expect(restaurantModel.findByIdAndUpdate).toBeCalledWith(restaurantId, newRestaurant, {
    //         new: true,
    //         useFindAndModify: false,
    //     })
    //})
});

describe('restaurantController.deleteRestaurant', () => {
    it("should have a deleteRestaurant function", () => {
        expect(typeof restaurantController.deleteRestaurant).toBe("function");
    });
    it("should call restaurantModel.findByIdAndDelete", async () => {
        await restaurantController.getRestaurant(res, req, next);
        expect(restaurantModel.findByIdAndDelete).toHaveBeenCalled;
    });
});
