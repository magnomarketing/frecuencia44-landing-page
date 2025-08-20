interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-md border border-border card-hover">
      {/* Service Icon */}
      <div className="mb-6">
        <img 
          src={icon} 
          alt={`${title} icon`}
          className="w-16 h-16 mx-auto object-contain"
        />
      </div>

      {/* Service Title */}
      <h3 className="text-xl font-bold text-foreground mb-4 text-center">
        {title}
      </h3>

      {/* Service Description */}
      <p className="text-muted-foreground text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;