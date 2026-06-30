const express = require('express');
const router = express.Router();

console.log('API routes loaded');

const {
    authenticate,
    authorize
} = require('../middleware/auth');
console.log("2. middleware loaded");

const WhoController =
    require("../controllers/WhoController");
console.log("3. WhoController");

const AuthController =
    require('../controllers/authController');
console.log("4. AuthController");

const ReportController =
    require('../controllers/reportController');
console.log("5. ReportController");

const ChildController =
    require('../controllers/ChildController');
console.log("6. ChildController");

const NutritionController = require("../controllers/NutritionController");
console.log("7. NutritionController");

const ActivityLogController = require("../controllers/ActivityLogController");
console.log("8. ActivityLogController");

const NotificationController = require("../controllers/NotificationController");
console.log("9. NotificationController");

const GrowthController = require("../controllers/GrowthController");
console.log("10. GrowthController");

const RecommendationController = require("../controllers/RecommendationController");
console.log("11. RecommendationController");

const ScheduleController = require("../controllers/ScheduleController");
console.log("12. ScheduleController");

const DashboardController = require("../controllers/DashboardController");
console.log("13. DashboardController");

const UserController = require("../controllers/UserController");
console.log("14. UserController");


router.post(
    '/login',
    AuthController.login
);

router.post(
    '/register',
    authenticate,
    authorize('super_admin'),
    AuthController.register
);

router.get(
    '/profile',
    authenticate,
    AuthController.profile
);

router.post(
    '/logout',
    authenticate,
    AuthController.logout
);



router.get(
    '/children',
    authenticate,
    authorize('admin', 'super_admin'),
    ChildController.index
);

router.get(
    '/children/my',
    authenticate,
    authorize('parent'),
    ChildController.myChildren
);

router.get(
    '/children/:id',
    authenticate,
    ChildController.show
);

router.put(
    '/growth/:id',
    authenticate,
    GrowthController.update
);

router.post(
    '/children',
    authenticate,
    authorize('admin', 'super_admin'),
    ChildController.store
);

router.put(
    '/children/:id',
    authenticate,
    authorize('admin', 'super_admin'),
    ChildController.update
);

router.delete(
    '/children/:id',
    authenticate,
    ChildController.destroy
);



router.post(
    '/growth',
    authenticate,
    authorize('admin', 'super_admin'),
    GrowthController.store
);

router.get(
    '/growth',
    authenticate,
    authorize('admin', 'super_admin'),
    GrowthController.index
);

// history parent sendiri
router.get(
    '/growth/history',
    authenticate,
    authorize('parent'),
    GrowthController.parentHistory
);

router.get(
    '/reports/pdf',
    authenticate,
    authorize(
        'admin',
        'super_admin'
    ),
    ReportController.exportPDF
);

router.get(
    "/summary",
    authenticate,
    authorize(
        "admin",
        "super_admin"
    ),
    ReportController.summary
);

// history berdasarkan child
router.get(
    '/growth/child/:childId',
    authenticate,
    GrowthController.history
);

// semua data nutrition
router.get(
    '/nutrition',
    authenticate,
    authorize('admin', 'super_admin'),
    NutritionController.index
);

// parent lihat data anak sendiri
router.get(
    '/nutrition/history',
    authenticate,
    authorize('parent'),
    NutritionController.parentHistory
);

router.get(
    '/nutrition/child/:childId',
    authenticate,
    NutritionController.history
);

router.get(
    '/recommendations',
    authenticate,
    authorize('admin', 'super_admin'),
    RecommendationController.index
);

router.get(
    '/recommendations/child/:childId',
    authenticate,
    RecommendationController.byChild
);

router.get(
    '/recommendations/latest/:childId',
    authenticate,
    RecommendationController.latest
);

router.get(
    '/users/parents',
    authenticate,
    authorize(
        'admin',
        'super_admin'
    ),
    UserController.parents
);

router.get(
    '/schedules',
    authenticate,
    ScheduleController.index
);

router.get(
    '/schedules/:id',
    authenticate,
    ScheduleController.show
);

router.post(
    '/schedules',
    authenticate,
    authorize('admin', 'super_admin'),
    ScheduleController.store
);

router.put(
    '/schedules/:id',
    authenticate,
    authorize('admin', 'super_admin'),
    ScheduleController.update
);

router.delete(
    '/schedules/:id',
    authenticate,
    authorize('admin', 'super_admin'),
    ScheduleController.destroy
);

router.get(
    '/logs',
    authenticate,
    authorize('admin', 'super_admin'),
    ActivityLogController.index
);

router.get(
    '/dashboard/stats',
    authenticate,
    authorize('admin', 'super_admin'),
    DashboardController.stats
);

router.get(
    "/growth-chart/:childId",
    DashboardController.growthChart
);

router.get(
    "/dashboard/growth-trend",
    authenticate,
    authorize(
        "admin",
        "super_admin"
    ),
    DashboardController.growthTrend
);

router.get(
    '/notifications',
    authenticate,
    NotificationController.index
);

router.get(
    "/users",
    authenticate,
    authorize("super_admin"),
    UserController.index
);

router.put(
    "/users/:id",
    authenticate,
    authorize("super_admin"),
    UserController.update
);

router.delete(
    "/users/:id",
    authenticate,
    authorize("super_admin"),
    UserController.destroy
);

router.get(
    "/who/curve/:gender",
    WhoController.curve
  );

  router.get(
  "/who/reference",
  WhoController.reference
);



router.get('/test', (req, res) => {

    res.json({
        message: 'API berjalan'
    });

});

module.exports = router;