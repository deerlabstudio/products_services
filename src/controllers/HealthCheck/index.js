class HealthCheckController {
  constructor(router) {
    this.router = router;
    this.router.get('/', this.info);
    this.router.get('healthcheck', this.health);
  }

  info(req, res) {
    res.json({
      name: process.env.SERVICE_NAME || 'produts_services',
      version: '1.0.0',
    });
  }

  health(req, res) {
    res.json({
      status: 'UP',
    });
  }
}

module.exports = HealthCheckController;
